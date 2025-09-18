import React, { useState, useMemo, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { allAgent, deleteAgent } from "../api/agentService";
import type { AgentProps } from "../api/agentService";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { MdModeEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";

const Agents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [modal, setModal] = useState(false)
  const [agentId, setAgentId] = useState("")
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error } = useQuery<AgentProps[]>({
    queryKey: ["allAgent"],
    queryFn: allAgent,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['deleteAgent', agentId],
    mutationFn: (id: string) => deleteAgent(id),
    onSuccess: (response) => {
      toast.success(response.message || 'Deleted Successfully'),
        setModal(false)
      queryClient.invalidateQueries({
        queryKey: ["allAgent"]
      })
    },
    onError: (response: any) => {
      toast.error(response.message || 'An Error occured')
      setModal(false)
    }
  })
  const agents: AgentProps[] = data || [];

  const filteredAgents = useMemo(() => {
    if (!searchTerm.trim()) return agents;
    const lowerSearch = searchTerm.toLowerCase();
    return agents.filter((agent) =>
      agent.name.toLowerCase().includes(lowerSearch) ||
      agent.contact.toLowerCase().includes(lowerSearch) ||
      agent.occupation.toLowerCase().includes(lowerSearch) ||
      agent.location.toLowerCase().includes(lowerSearch)
    );
  }, [agents, searchTerm]);

  const totalItems = filteredAgents.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAgents = filteredAgents.slice(startIndex, endIndex);

  // Reset to first page if searchTerm changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage, agents]);

  const goToPage = (page: number) => {
    const p = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(p);
  };

  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const getPageNumbers = () => {
    const delta = 2;
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1 && !rangeWithDots.includes(totalPages)) {
      rangeWithDots.push(totalPages);
    }

    return Array.from(new Set(rangeWithDots));
  };

  type AgentExport = Omit<AgentProps, "_id"> & { No: number };

  const exportToXLSX = (): void => {
    const dataToExport: AgentExport[] = filteredAgents.map(({ _id, createdAt, updatedAt, __v, ...rest }, index) => ({
      No: index + 1,
      ...rest,
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Agents");

    const excelBuffer: any = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob: Blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(blob, "agents.xlsx");
  };

  const exportToCSV = (): void => {
    const dataToExport: AgentExport[] = filteredAgents.map(({ _id, createdAt, updatedAt, __v, ...rest }, index) => ({
      No: index + 1,
      ...rest,
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const csv: string = XLSX.utils.sheet_to_csv(worksheet);
    const blob: Blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    saveAs(blob, "agents.csv");
  };

  const handleDeleteClick = (id: string) => {
    setAgentId(id)
    setModal(true)
  }
  return (
    <div className="max-w-screen grid justify-center md:block mx-auto p-4 bg-white rounded shadow pr-5">
      <h1 className="text-2xl font-semibold mb-4 text-center md:text-left">All Agents</h1>

      <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-4 mt-2 mr-3">
        <div className="flex gap-2">
          <button className="px-3 py-1 cursor-pointer bg-primary text-white rounded text-sm hover:brightness-90 transition" onClick={exportToCSV}>
            Export CSV
          </button>
          <button className="px-3 py-1 bg-primary cursor-pointer text-white rounded text-sm hover:brightness-90 transition" onClick={exportToXLSX}>
            Export XLSX
          </button>
        </div>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search by name, contact, occupation or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="20"
            height="20"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2 text-sm text-gray-600 pr-3">
        <p>
          Showing {totalItems === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} agents
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="itemsPerPage">Show:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            className="border border-gray-300 rounded px-2 py-1 cursor-pointer"
          >
            {[5, 10, 25, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span>per page</span>
        </div>
      </div>

      <div className="overflow-auto h-[45vh] xl:h-[47vh] max-w-full border border-gray-200 rounded mr-3 ">
        <table className="min-w-full table-auto whitespace-nowrap text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 ">No</th>
              <th className="border border-gray-300 px-4 py-2 ">Name</th>
              <th className="border border-gray-300 px-4 py-2 ">Contact</th>
              <th className="border border-gray-300 px-4 py-2 ">Occupation</th>
              <th className="border border-gray-300 px-4 py-2 ">Location</th>
              <th className="border border-gray-300 px-4 py-2 " colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-6">
                  Loading agents...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-red-600">
                  {`Error: ${(error as Error)?.message}`}
                </td>
              </tr>
            ) : currentAgents.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6">
                  No agents found.
                </td>
              </tr>
            ) : (
              currentAgents.map((agent, idx) => (
                <tr key={agent._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{startIndex + idx + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{agent.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{agent.contact}</td>
                  <td className="border border-gray-300 px-4 py-2">{agent.occupation}</td>
                  <td className="border border-gray-300 px-4 py-2">{agent.location}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className=' py-2 px-2 rounded-md cursor-pointer text-amber-600 transition-colors'
                      onClick={() => navigate(`update-agent/${agent._id}`)}
                    >
                      <MdModeEdit size={22} />

                    </button>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className=' py-2 px-2 rounded-md cursor-pointer text-red-500 transition-colors'
                      onClick={() => handleDeleteClick(agent._id!)}
                    >

                      <FaTrashCan size={22} />
                    </button>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 pt-2 bg-white border-t border-gray-200 mt-4">
          <button
            onClick={goToPrevious}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm font-medium text-gray-500 cursor-pointer bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex items-center space-x-2">
            {getPageNumbers().map((page, index) => (
              <button
                key={`page-${index}`}
                onClick={() => typeof page === "number" && goToPage(page)}
                disabled={page === "..."}
                className={`px-3 py-1 text-sm font cursor-pointer-medium rounded-md ${page === currentPage
                  ? "bg-primary text-white"
                  : page === "..."
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                  }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className="px-3 cursor-pointer py-1 text-sm  font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {modal && (


        <div className="fixed inset-0 z-50 flex items-center justify-center">

          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setModal(false)}
          ></div>


          <div className="relative z-10 p-6 bg-white rounded shadow-lg w-[90%] md:max-w-md text-center space-y-2">

            <div className="flex justify-end">
              <button
                onClick={() => setModal(false)}
                className="text-gray-500 hover:text-gray-800 cursor-pointer"
              >
                <RxCross2 className="w-6 h-6" />
              </button>
            </div>


            <h2 className="text-xl font-semibold text-gray-800">Confirm Delete</h2>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to delete this agent? This action cannot be undone.
            </p>

            <button disabled={isPending} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-[0.7] cursor-pointer w-full"
              onClick={() => mutate(agentId)}
            >
              {isPending ? 'Deleting..' : 'Delete'}
            </button>

          </div>
        </div>

      )}
    </div>
  );
};

export default Agents;
