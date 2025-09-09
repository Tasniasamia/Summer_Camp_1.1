import prisma from "@/lib/db";
import { verifyToken } from "@/lib/helpers/jwt";
import { ssLcommerzeController } from "../payment/ssl_commerze/ssLcommerzeController";
import { stripeController } from "../payment/stripe/stripeController";

export const enrollClass = async (req) => {
  try {
    const body = await req.json();
    const { resourceId,resourceType, userId ,payment} = body;

    // 1. Find user
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return { success: false, msg: "User not found", status: 404 };
    }

    if (user.role !== "student") {
      return { success: false, msg: "Only students can enroll", status: 400 };
    }

    // 2. Find class
    const data = await prisma.class.findUnique({
      where: { id: parseInt(resourceId) },
    });

    if (!data) {
      return { success: false, msg: "Class not found", status: 404 };
    }

    // 3. Check if user already enrolled
    const enrolledUser = await prisma.enrollClass.findFirst({
      where: {
        userId: userId,
        classId: resourceId,
        status: "paid",
      },
    });

    if (enrolledUser) {
      return { error: "Already Enrolled", success: false, status: 400 };
    }

    // 4. Prepare transaction
    const transaction = `tran_${Date.now()}`;
    if(payment==="sslcommerze"){
      const result = await ssLcommerzeController({ user, data,resourceType, transaction });
      return result;
    }
    else  if(payment==="stripe"){
      const result = await stripeController({ user, data,resourceType, transaction });
      return result;
    }
    } catch (e) {
    return { success: false, msg: e?.message || "Something went wrong", status: 500 };
  }
};

export const updateEnrollClass=async(req)=>{
    try {
       const data = await req.json();
        const { id, classId, userId, status, transactionId } = data;
        if (id || transactionId) {
          if (transactionId) {
            const updateData = await prisma.enrollClass.update({
              where: { transactionId: transactionId },
              data: { status: status, transactionId: transactionId },
            });
            return { data: updateData ,success:true,status: 200,msg:"Data updated successfully" }
            
          } else if (id) {
            const updateData = await prisma.enrollClass.update({
              where: { id: id },
              data: data,
            });
            return { data: updateData ,success:true, status: 200 }
            
          } else {
            return { msg: "Id or transactionId is required" ,success:false, status: 400 }
            
          }
        }
      } catch (err) {
        return {success:false,msg:err?.message,status:500}

      }
}

export const getEnrollClass=async(req)=>{
    try {
        const searchParams = new URL(req.URL);
        const id = searchParams.get("id");
        if (!id) {
          return { msg: "Id is required" ,success:false,
            status: 400,
          }
        }
        if (id) {
          const data = await prisma.enrollClass.findUnique({ where: { id: id } });
          return { data: data ,msg:"Enrolled Successfully", success:true,status: 200 };
        }
        const data = await prisma.enrollClass.findMany({});
        return { data: data ,success:true,msg:"" , status: 200 };
      } catch (err) {
        return {success:false,msg:err?.message,status:500}

      }
}
export const getEnrolledClass = async (req) => {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return { msg: "Unauthorized Access", success: false, status: 401 };
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);

    if (!payload?.role) {
      return { msg: "Invalid Token", success: false, status: 401 };
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search");

    const skip = (page - 1) * limit;

    // search filter
    const findSearch = search
      ? { class: { name: { contains: search, mode: "insensitive" } } }
      : {};

    // role অনুযায়ী filter
    let whereClause = {};
    if (payload.role === "student") {
      whereClause = { userId: payload.id, ...findSearch };
    } else if (payload.role === "instructor") {
      whereClause = {
        class: {
          instructorId: payload.id,
          ...(findSearch.class || {}),
        },
      };
    } else if (payload.role === "admin") {
      whereClause = { ...findSearch };
    }

    const [docs, totalDocs] = await Promise.all([
      prisma.enrollClass.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        where: whereClause,
        include: {
          class: {
            select: {
              name: true,
              price: true,
              image: true,
              status: true,
              category: true,
              instructor: {
                select: { name: true, email: true },
              },
            },
          },
          user: {
            select: { name: true, email: true },
          },
        },
      }),
      prisma.enrollClass.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(totalDocs / limit);

    const responseData = {
      success: true,
      statusCode: 200,
      message: "Enroll class fetched successfully",
      data: {
        docs,
        totalDocs,
        limit,
        page,
        totalPages,
        pagingCounter: skip + 1,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null,
      },
    };

    return {
      data: responseData,
      msg: "Get enrolled classes successfully",
      status: 200,
      success: true,
    };
  } catch (error) {
    return { success: false, msg: error.message, status: 500 };
  }
}
// B35847EF51BCF8F38AB6F7010A0339B1