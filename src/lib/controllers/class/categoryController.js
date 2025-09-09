import prisma from "@/lib/db";
import { verifyToken } from "@/lib/helpers/jwt";

export const postClassCategory = async (req) => {
  try {
    const header = await req.headers.get("authorization");
    const token = header.split(" ")[1];
    if (!token) {
      return { success: false, msg: "Unauthorized Access", status: 401 };
    }
    if (token) {
      const user = verifyToken(token);

      if (user?.role === "admin") {
        const { name, image } = await req.json();
        const findUnique = await prisma.category.findFirst({
          where: { name: name },
        });
        if (findUnique) {
          return { success: false, msg: "Category already exist", status: 400 };
        }
        const postCategory = await prisma.category.create({
          data: { name: name, image: image },
        });
        if (postCategory) {
          return {
            success: true,
            msg: "Category created successfully",
            status: 200,
          };
        }
      }
    }
  } catch (e) {
    return { success: false, msg: e?.message, status: 500 };
  }
};

export const getAllCategory = async (req) => {
  try {
    const {searchParams} = new URL(req.url);
    let limit = parseInt(searchParams.get("limit"));
    let page = parseInt(searchParams.get("page"));
    const search=searchParams.get("search");
    if (limit || page) {
      const [docs, totalDocs] = await Promise.all([
        prisma.category.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where:search
        }),
        prisma.category.count(),
      ]);
      const totalPages = Math.ceil(totalDocs / limit);
      const hasPrevPage = page > 1;
      const hasNextPage = page < totalPages;
      return {
        success: true,
        msg: "Get data successfully",
        data: {
          docs,
          totalDocs: totalDocs,
          limit: limit,
          currentPage: page,
          hasPrevPage: hasPrevPage,
          hasNextPage: hasNextPage,
          totalPages:totalPages,
          prevPage:page>1?currentPage-1:null,
          nextPage:page<totalPages?currentPage+1:null

        },
        status:200
      };
    }

    const allCategory = await prisma.category.findMany({});
    if (allCategory) {
      return {
        success: true,
        data: allCategory,
        msg: "Get All Category Successfully",
        status: 200,
      };
    }
  } catch (e) {
    return { success: false, msg: e?.message, status: 500 };
  }
};

export const putClassCategory = async (req) => {
  try {
    const header = await req.headers.get("authorization");
    const token = header.split(" ")[1];
    if (!token) {
      return { success: false, msg: "Unauthorized Access", status: 401 };
    }
    if (token) {
      const user = verifyToken(token);
      const { id, name, image } = await req.json();
      if (user?.role === "admin") {
        const updateData = await prisma.category.update({
          where: { id: id },
          data: { name: name, image: image, id: id },
        });
        if (updateData) {
          return {
            success: true,
            msg: "Category updated successfully",
            status: 400,
          };
        }
      }
    }
  } catch (e) {
    return { success: false, msg: e?.message, status: 500 };
  }
};

export const deleteCateogry = async (req) => {
  try {
    const header = await req.headers.get("authorization");
    const token = header.split(" ")[1];
    if (!token) {
      return { success: false, msg: "Unauthorized Access", status: 401 };
    }
    if (token) {
      const user = verifyToken(token);
      if (user?.role === "admin") {
        const { id } = await req.json();
        if (id) {
          const findData = await prisma.category.delete({ where: { id: id } });
          if (findData) {
            return {
              success: true,
              msg: "Category deleted successfully",
              status: 200,
            };
          }
        }
      }
    }
  } catch (e) {
    return { success: false, msg: e?.message, status: 500 };
  }
};
