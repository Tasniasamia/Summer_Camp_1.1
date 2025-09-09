"use client";
import { usePathname } from "next/navigation";
import { FaEye } from "react-icons/fa6";
import { FaTimes, FaTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import Image from "next/image";
import { Modal, Spin } from "antd";
import SearchInput from "../search";
// import Pagination from "../pagination";

const UserDashBoardTable = ({
  columns,
  data,
  indexed,
  loading = false,
  noActions,
  actions,
  action,
  onView,
  onEdit,
  onDelete,
  onReload,
  pagination = false,
  shadow = true,
  title,
  noHeader = false,
  afterSearch,
  onSearchChange,

}) => {
//   const handleEditClick = (data) => {
//     onEdit(data);
//   };
  const pathname = usePathname();

//   const handleDeleteClick = async (data) => {
//    console.log(data);
//   };

  let cols = noActions
    ? columns
    : [
        ...columns,
        {
          text: "Action",
          dataField: "no_actions",
          className: " text-right mr-2",
          formatter: (noActions, data) => {
            return (
              <div className="flex justify-end gap-2.5">
                {typeof actions === "function" && actions(data)}

                {onView && (
                  <button
                    className="btn btn-outline-success btn-sm focus:shadow-none border border-primary text-primary p-2 rounded hover:bg-primary hover:text-white"
                    title="View"
                    onClick={() => onView(data)}
                  >
                    <FaEye />
                  </button>
                )}
                {data.disableEdit === 1 &&
                  !onView &&
                  data.disableDelete === 1 &&
                  !actions &&
                  "-"}
                {onEdit && data?.disableEdit !== 1 && (
                  <button
                    className="border border-primary text-primary p-2 rounded hover:bg-primary hover:text-white focus:shadow-none"
                    title="Edit"
                    onClick={() => onEdit(data)}
                  >
                    <FaPencilAlt size={12} />
                  </button>
                )}
                {onDelete && data?.disableDelete !== 1 && (
                  <button
                    className="border border-red-700 p-2 rounded hover:bg-red-700 text-red-600 hover:text-white focus:shadow-none"
                    title="Delete"
                    onClick={() => onDelete(data)}
                  >
                    <FaTrashAlt size={12} />
                  </button>
                )}
              </div>
            );
          },
        },
      ];

  return (
    <>
      <div 
        className={`w-full pl-[2px] ${
          shadow ? "shadow-lg" : ""
        } rounded-sm mb-4 ${pathname === "/vendor" ? "seller" : ""}`}
      >
        {noHeader || (
          <header className=" gap-3  flex justify-between flex-wrap">
            {title ? (
              <>
                {typeof title === "string" ? (
                  <h4 className="text-base font-medium ">
                    {title}
                  </h4>
                ) : (
                  title
                )}
              </>
            ) : (
              <div className="flex justify-between">
                <div className="flex flex-wrap">
                 <SearchInput/>
                </div>
              </div>
            )}
            {action}
          </header>
        )}
        <div
          className={`pt-7 relative ${
            pathname === "/vendor" ? "seller-scroller" : ""
          } overflow-x-auto`}
        >
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
                            <thead className="text-sm font-semibold uppercase bg-gray-50 text-gray-500">
                <tr>
                  {indexed && (
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left ">#</div>
                    </th>
                  )}
                  {cols?.map((column, index) => (
                    <th
                      className="py-4 whitespace-nowrap  text-left "
                      key={index}
                    >
                      <div
                        className={`font-semibold ${column?.className || ""}`}
                      >
                        {column?.text}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm divide-y-2 ">
                {loading ? (
                  <tr>
                    <td className="h-96 pb-16">
                      <div
                        style={{ height: 200 }}
                        className="absolute w-full flex justify-center"
                      >
                        <Spin/>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {(Pagination ? data?.docs : data)?.map((row, index) => (
                      <tr key={index}>
                        {indexed && (
                          <td className="py-8 whitespace-nowrap">
                            {(pagination ? (data?.page - 1) * data.limit : 0) +
                              index +
                              1}
                          </td>
                        )}
                        {cols?.map((column, index) => (
                          <td
                            className={`p-2 whitespace-nowrap  ${
                              column?.className || ""
                            }`}
                            key={index}
                          >
                            {column.formatter
                              ? column.formatter(row[column.dataField], row)
                              : row[column.dataField] || "-"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
          {pagination && (
            <div className="pt-5 border-t-2">
              <Pagination
                page={data?.page}
                total={data?.totalDocs}
                onSizeChange={(limit) => onReload({ limit, langCode })}
                limit={data?.limit}
                totalPages={data?.totalPages}
                onPageChange={(page) => onReload({ page, langCode })}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default UserDashBoardTable;

export const DetailTable = ({ data, columns, title, actions }) => {
  return (
    <div className="shadow-md rounded-md p-4">
      {!!title && (
        <div className="text-xl font-semibold mb-4">{title}</div>
      )}
      <div className="body">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <tbody>
              {columns?.map((column, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="py-2 px-4">{column?.text}</td>
                  <td className="py-2 px-4 text-sm">
                    {!!data
                      ? !!column?.formatter
                        ? column?.formatter(data[column.dataIndex], data)
                        : data[column.dataIndex]
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {actions}
      </div>
    </div>
  );
};

export const TableImage = ({ url }) => {
  const [image, setImage] = useState();
  return (
    <div className="w-inline-block h-10 w-10 bg-[#1c2c52] !rounded-full">
      <Image
        role="button"
        src={url}
        width={100}
        height={100}
        alt="Image"
        onClick={() => setImage(url)}
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
      <Modal
        width={800}
        open={image}
        onCancel={() => setImage(undefined)}
        footer={null}
        styles={{ body: { padding: 0, zIndex: 60 } }} 
        closeIcon={
          <FaTimes size={18} className="rounded hover:!bg-none text-primary" />
        }
      >
        <div className="flex justify-center items-center">
          <Image
            width={100}
            height={100}
            className="w-[100px]"
            style={{ minHeight: 400 }}
            src={image}
            alt=""
          />
        </div>
      </Modal>
    </div>
  );
};

