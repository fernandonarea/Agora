import useSupplier from "@/hooks/useSupplier";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { DeleteSupplier } from "./delete-supplier";
import { UpdateSupplierForm } from "./update-supplier";

const SuppliersList = ({ token, onRefresh }) => {
  const { Suppliers, suppliers, error, loading } = useSupplier();

  const [search, setSearch] = useState("");
  const [open, setIsOpen] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState("")

  useEffect(() => {
    Suppliers(token);
  }, [token]);

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    setIsOpen(true);
  };

  const handleRefresh = () => {
    Suppliers(token);
  };

  const filterSuppliers = !search
    ? suppliers
    : suppliers.filter(
        (supplier) =>
          supplier.supplier_name
            .toLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          supplier.supplier_phone
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          supplier.supplier_email.toLowerCase().includes(search.toLowerCase())
      );

  if (loading && suppliers.length === 0) return <p>Loading...</p>;

  if (error && suppliers.length === 0) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col gap-5 w-full">
      <Input
        value={search}
        onChange={handleSearch}
        placeholder="Search supplier by name"
        className="w-1/3"
      />
      <div className="border border-gray-200 rounded-lg shadow-xs overflow-auto dark:border-neutral-700">
        <table className="min-w-full divide-y divide-gray-200 overflow-auto whitespace-nowrap dark:divide-neutral-700">
          <thead className=" bg-gray-50 dark:bg-neutral-700">
            <tr>
              <th className="px-5 py-3 text-start text-xs font-medium text-gray-500 dark:text-neutral-300">
                Id
              </th>
              <th className="px-5 py-3 text-start text-xs font-medium text-gray-500 dark:text-neutral-300">
                Name
              </th>
              <th className="px-5 py-3 text-start text-xs font-medium text-gray-500 dark:text-neutral-300">
                Phone
              </th>
              <th className="px-5 py-3 text-start text-xs font-medium text-gray-500 dark:text-neutral-300">
                Email
              </th>
              <th className="px-5 py-3 text-start text-xs font-medium text-gray-500 dark:text-neutral-300">
                Creation Date
              </th>
              <th className="px-5 py-3 text-start text-xs font-medium text-gray-500 dark:text-neutral-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-neutral-700">
            {filterSuppliers.map((supplier) => (
              <tr
                key={supplier.id_supplier}
                className=" hover:bg-gray-100  dark:hover:bg-neutral-800"
              >
                <td className="text-sm px-6 py-3 font-medium">{supplier.id_supplier}</td>
                <td className="text-sm px-6 py-3 font-medium"> {supplier.supplier_name}</td>
                <td className="text-sm px-6 py-3 font-normal">{supplier.supplier_phone}</td>
                <td className="text-sm px-6 py-3 font-normal hover:underline">
                  <a href={`mailto:${supplier.supplier_email}`}> {supplier.supplier_email}</a>
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm font-regular text-gray-800 dark:text-neutral-200">
                  {new Date(supplier.date_added).toLocaleDateString()}
                </td>
                <td className="flex gap-3 px-6 py-3 text-sm font-medium">
                  <Button
                    variant="outline"
                    className="hover:bg-violet-500 hover:text-white dark:hover:bg-violet-700"
                    onClick={() => handleEdit(supplier)}
                  >
                    <Pencil size={16} />
                  </Button>
                  <DeleteSupplier
                    id_supplier={supplier.id_supplier}
                    token={token}
                    onRefresh={onRefresh}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UpdateSupplierForm
          token={token}
          supplier={selectedSupplier}
          isOpen={open}
          onClose={() => setIsOpen(false)}
          onUpdated={handleRefresh}
      />
    </div>

  );
};

export default SuppliersList;
