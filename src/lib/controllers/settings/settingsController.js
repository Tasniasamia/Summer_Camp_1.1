import prisma from "@/lib/db";

export const postPage = async (req) => {
  try {
    const data = await req.json();
    const { slug } = data;
    const existPage = await prisma.page.findUnique({ where: { slug: slug } });
    if (existPage) {
      const res = await prisma.page.update({
        where: { slug: slug },
        data: data,
      });
      return {
        success: true,
        status: 200,
        msg: "Page Update successfully",
        data: res,
      };
    } else {
      const res = await prisma.page.create({ data: data });
      return {
        success: true,
        status: 200,
        msg: "Page create successfully",
        data: res,
      };
    }
  } catch (e) {
    return { success: false, msg: e?.message, status: 500 };
  }
};

export const getPage = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (slug) {
      const data = await prisma.page.findUnique({ where: { slug: slug } });
      return { success: true, status: 200, data: data };
    } else {
      const data = await prisma.page.findMany();
      return { success: true, status: 200, data: data };
    }
  } catch (e) {
    return { success: false, msg: e?.message, status: 500 };
  }
};

export const postSettings = async (req) => {
  try {
    const data = await req.json();
    const res = await prisma.page.create({ data: data });
    return {
      success: true,
      status: 200,
      msg: "Settings created successfully",
      data: res,
    };
  } catch (e) {
    return { success: false, msg: e?.message, status: 500 };
  }
};

export const updateSettings = async (req) => {
  try {
    const data = await req.json();
    const { id } = data;
    const res = await prisma.page.update({
      where: { id: parseInt(id) },
      data: data,
    });
    return {
      success: true,
      status: 200,
      msg: "Settings updated successfully",
      data: res,
    };
  } catch (e) {
    return { success: false, msg: e?.message, status: 500 };
  }
};

export const getSettings = async (req) => {
  try {
    const data = await prisma.page.findMany();
    return { success: true, status: 200, data: data };
  } catch (e) {
    return { success: false, msg: e?.message, status: 500 };
  }
};
