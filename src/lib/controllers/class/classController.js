import prisma from "@/lib/db";
import { verifyToken } from "@/lib/helpers/jwt";

export const postClass = async (req) => {
  try {
    const header = await req.headers.get("authorization");
    const token = header.split(" ")[1];
    if (!token) {
      return { success: false, msg: "Unauthorized Access", status: 401 };
    }
    if (token) {
      const user = verifyToken(token);

      if (user?.role === "admin") {
        const data = await req.json();
        if (!data) {
          return { status: 400, msg: "No Content", success: false };
        }
        const result = await prisma.class.create({
          data: data,
        });

        return {
          data: result,
          success: true,
          msg: "Class created successfully",
          status: 200,
        };
      }
    }
  } catch (err) {
    return { success: false, msg: err?.message, status: 400 };
  }
};

export const getClass = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
      const classData = await prisma.class.findUnique({
        where: { id: parseInt(id) },
      });
      console.log("classdata", classData);
      if (!classData) {
        return { msg: "Class not found",success:false,
          status: 400,
        };
      }
      return {
        data: classData,
        msg: "Get Class successfully",
        status: 200,
        success: true,
      };
    } else {
      const page = parseInt(searchParams.get("page") || "1");
      const limit = parseInt(searchParams.get("limit") || "10");
      const search = searchParams.get("search");
      if (page || limit || search) {
        const skip = (page - 1) * limit;
        const findSearch = search ? { name: { contains: search } } : {};
        const [docs, totalDocs] = await Promise.all([
          prisma.class.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            where: findSearch,
          }),
          prisma.class.count(),
        ]);
        const totalPages = Math.ceil(totalDocs / limit);
        const responseData = {
          success: true,
          statusCode: 200,
          message: "Classes fetched successfully",
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
          msg: "Get Class successfully",
          status: 200,
          success: true,
        };
      } 
      else {
        const alldata = await prisma.class.findMany({});
        return {
          data: alldata,
          msg: "Get Class successfully",
          status: 200,
          success: true,
        };
      }
    }
  } catch (err) {
    return { success: false, msg: err?.message, status: 400 };
  }
};

export const deleteClass = async (req) => {
  try {
    const body = await req.json();
    const id = body?.id;
    if (!id) {
      return { error: "id is required for delete", status: 400 };
    }
    const deletedUser = await prisma.class.delete({
      where: { id: parseInt(id) },
    });
    return { status: 200, success: true, msg: "class deleted successfully" };
  } catch (error) {
    return { status: 500, success: false, msg: error?.message };
  }
};

export const updateClass = async (req) => {
  try {
    const header = await req.headers.get("authorization");
    const token = header.split(" ")[1];
    if (!token) {
      return { success: false, msg: "Unauthorized Access", status: 401 };
    }
    if (token) {
      const user = verifyToken(token);
      if (user?.role === "admin") {
        const data = await req.json();
        if (!data?.id) {
          return {
            success: false,
            msg: "Class id is required for Update",
            status: 400,
          };
        }
        const classId = parseInt(data.id);
        const { id, ...updateData } = data;
        const updatedClass = await prisma.class.update({
          where: { id: classId },
          data: updateData,
        });
        return { success: true,msg:"Class updated successfully" ,class: updatedClass, status: 200 };
      }
    }
  } catch (error) {
    return { status: 500, success: false, msg: error?.message };
  }
};

export const getAllClass = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
      const classData = await prisma.class.findUnique({
        where: { id: parseInt(id) },
      });
      console.log("classdata", classData);
      if (!classData) {
        return { msg: "Class not found" ,success:false,
          status: 400
        };
      }
      return {
        data: classData,
        msg: "Get Class successfully",
        status: 200,
        success: true,
      };
    } else {
      const page = parseInt(searchParams.get("page") || "1");
      const limit = parseInt(searchParams.get("limit") || "10");
      const search = searchParams.get("search");
      if (page || limit || search) {
        const skip = (page - 1) * limit;
        const findSearch = search ? { name: { contains: search } } : {};
        const [docs, totalDocs] = await Promise.all([
          prisma.class.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            where: {
              ...findSearch,         
              status:true,       
            }
          }),
          prisma.class.count({where:{status:true}}),
        ]);
        const totalPages = Math.ceil(totalDocs / limit);
        const responseData = {
          success: true,
          statusCode: 200,
          message: "Classes fetched successfully",
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
          msg: "Get Class successfully",
          status: 200,
          success: true,
        };
      } else {
        const alldata = await prisma.class.findMany({});
        return {
          data: alldata,
          msg: "Get Class successfully",
          status: 200,
          success: true,
        };
      }
    }
  } catch (err) {
    return { success: false, msg: err?.message, status: 400 };
  }
};