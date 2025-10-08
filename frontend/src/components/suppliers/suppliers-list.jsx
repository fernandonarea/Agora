import useSupplier from "@/hooks/useSupplier";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { DeleteSupplier } from "./delete-supplier";

const SuppliersList = ({ token, onRefresh }) => {
  const { Suppliers, suppliers, error, loading } = useSupplier();

  const [search, setSearch] = useState("");

  useEffect(() => {
    Suppliers(token);
  }, [token]);

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
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

  if (loading) return <p>Cargando...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col gap-5 w-full">
      <Input
        value={search}
        onChange={handleSearch}
        placeholder="Buscar proveedor"
      />
      <div className="border border-gray-200 rounded-lg shadow-xs overflow-hidden dark:border-neutral-700">
        <table className="min-w-full divide-y divide-gray-200 overflow-hidden whitespace-nowrap dark:divide-neutral-700">
          <thead className=" bg-gray-50 dark:bg-neutral-700">
            <tr>
              <th className="px-5 py-5 text-start text-xs font-medium text-gray-500 dark:text-neutral-300">
                Id
              </th>
              <th className="px-5 py-5 text-start text-xs font-medium text-gray-500 dark:text-neutral-300">
                Nombre
              </th>
              <th className="px-5 py-5 text-start text-xs font-medium text-gray-500 dark:text-neutral-300">
                Telefono
              </th>
              <th className="px-5 py-5 text-start text-xs font-medium text-gray-500 dark:text-neutral-300">
                Correo
              </th>
              <th className="px-5 py-5 text-start text-xs font-medium text-gray-500 dark:text-neutral-300">
                Fecha de Creacion
              </th>
              <th className="px-5 py-5 text-start text-xs font-medium text-gray-500 dark:text-neutral-300">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-neutral-700">
            {filterSuppliers.map((supplier) => (
              <tr
                key={supplier.id_supplier}
                className=" hover:bg-gray-100  dark:hover:bg-neutral-800"
              >
                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                  {supplier.id_supplier}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                  {supplier.supplier_name}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm font-regular text-gray-800 dark:text-neutral-200">
                  {supplier.supplier_phone}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm font-regular text-gray-800 dark:text-neutral-200">
                  {supplier.supplier_email}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm font-regular text-gray-800 dark:text-neutral-200">
                  {supplier.date_added}
                </td>
                <td className="flex gap-3 px-6 py-3 text-sm font-medium">
                  <Button
                    variant="outline"
                    className="hover:bg-violet-500 hover:text-white dark:hover:bg-violet-700"
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
    </div>
  );
};

export default SuppliersList;
