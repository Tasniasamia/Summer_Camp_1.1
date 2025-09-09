import prisma from "@/lib/db";
import { verifyToken } from "@/lib/helpers/jwt";
import { ssLcommerzeController } from "../payment/ssl_commerze/ssLcommerzeController";
import { stripeController } from "../payment/stripe/stripeController";

export const postPackage = async (req) => {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader.split(" ")[1];
    if (!token) {
      return { success: false, status: 401, msg: "Unauthorized access" };
    }
    const payload = verifyToken(token);
    if (payload?.role === "admin") {
      const data = await req.json();
      const findPackage = await prisma.package.findFirst({
        where: { name: data?.name },
      });
      if (findPackage) {
        return { success: false, status: 400, msg: "Package already created" };
      }
      const totalPackage = await prisma.package.count();
      if (totalPackage < 3) {
        const createPackage = await prisma.package.create({ data: data });
        if (createPackage) {
          return {
            success: true,
            status: 200,
            msg: "Package created successfully",
          };
        }
      } else {
        return {
          success: false,
          status: 400,
          msg: "You have already created 3 packages",
        };
      }
    } else {
      return {
        status: 400,
        success: false,
        msg: "Only admin can create package",
      };
    }
  } catch (e) {
    return { status: 500, success: false, msg: e?.message };
  }
};

export const getPackage = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
      const findPackage = await prisma.package.findUnique({
        where: { id: parseInt(id) },
      });
      return { status: 200, success: true, data: findPackage };
    } else {
      const packageAll = await prisma.package.findMany({});
      return { status: 200, success: true, data: packageAll };
    }
  } catch (e) {
    return { status: 500, success: false, msg: e?.message };
  }
};

export const getPackageByUser = async (req) => {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader.split(" ")[1];
    if (!token) {
      return { success: false, msg: "Unauthrized Access", status: 401 };
    }
    const { id, role, email } = verifyToken(token);
    if (role === "student") {
      const data = await prisma.purchasePackage.findFirst({
        where: { userId: id, status: "paid" },
      });
      return { status: 200, data: data, success: true };
    } else if (role === "admin") {
      const { searchParams } = new URL(req.url);
      const limit = parseInt(searchParams.get("limit"));
      const page = parseInt(searchParams.get("page"));
      if(limit || page){
        const [docs, totalDocs] = await Promise.all([
        prisma.purchasePackage.findMany({
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),
        prisma.purchasePackage.count(),
      ]);
      const totalPages = Math.ceil(totalDocs / limit);

      return {
        status: 200,
        data: {
          docs,
          limit: limit,
          page: page,
          totalPages: totalPages,
          hasPrevPage: page > 1 ? true : false,
          hasNextPage: page < totalPages ? true : false,
          prevPage: page > 1 ? page - 1 : null,
          nextPage: page < totalPages ? page + 1 : null,
        },
        success: true,
      };
    }
    else{
      const data = await prisma.purchasePackage.findMany();
      return {status:200,success:true,data:data}
    }
    } else {
      return { status: 400, msg: "No package Found", success: false };
    }
  } catch (e) {
    return { status: 500, success: false, msg: e?.message };
  }
};

export const updatePackage = async (req) => {
  try {
    const authHeader = req.headers.get("authorization"); // fixed typo
    if (!authHeader) {
      return { success: false, status: 401, msg: "Unauthorized access" };
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);

    if (payload?.role !== "admin") {
      return {
        status: 403,
        success: false,
        msg: "Only admin can update package",
      };
    }

    const { id, ...others } = await req.json();

    if (!id) {
      return { success: false, status: 400, msg: "Package id is required" };
    }

    const updatedPackage = await prisma.package.update({
      where: { id: parseInt(id) },
      data: others,
    });

    return {
      success: true,
      status: 200,
      msg: "Package updated successfully",
      data: updatedPackage,
    };
  } catch (e) {
    return { status: 500, success: false, msg: e?.message };
  }
};

export const deletePackage = async (req) => {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return { success: false, status: 401, msg: "Unauthorized access" };
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);

    if (payload?.role !== "admin") {
      return {
        success: false,
        status: 403,
        msg: "Only admin can delete packages",
      };
    }

    const url = new URL(req.url);
    let id = url.searchParams.get("id");

    if (!id) {
      const body = await req.json();
      id = body.id;
    }

    if (!id) {
      return { success: false, status: 400, msg: "Package id is required" };
    }

    const deletedPackage = await prisma.package.delete({
      where: { id: parseInt(id) },
    });

    return {
      success: true,
      status: 200,
      msg: "Package deleted successfully",
      data: deletedPackage,
    };
  } catch (e) {
    return { success: false, status: 500, msg: e?.message };
  }
};

export const buyPacakge = async (req) => {
  try {
    const { userId, resourceId, resourceType, payment } = await req.json();
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return { success: false, msg: "User not found", status: 404 };
    }

    if (user.role !== "student") {
      return {
        success: false,
        msg: "Only students can buy package",
        status: 400,
      };
    }

    // 2. Find package
    const data = await prisma.package.findUnique({
      where: { id: parseInt(resourceId) },
    });

    if (!data) {
      return { success: false, msg: "Package not found", status: 404 };
    }

    const soldPackage = await prisma.purchasePackage.findFirst({
      where: {
        userId: userId,
        packageId: resourceId,
        status: "paid",
      },
    });

    if (soldPackage) {
      return {
        error: "You have already bought this package",
        success: false,
        status: 400,
      };
    }

    // 4. Prepare transaction
    const transaction = `tran_${Date.now()}`;
    if (payment === "sslcommerze") {
      const result = await ssLcommerzeController({
        user,
        data,
        resourceType,
        transaction,
      });
      return result;
    } else if (payment === "stripe") {
      const result = await stripeController({
        user,
        data,
        resourceType,
        transaction,
      });
      return result;
    }
  } catch (e) {
    return { success: false, status: 500, msg: e?.message };
  }
};
