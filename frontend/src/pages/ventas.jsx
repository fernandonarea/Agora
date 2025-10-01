import { CreateSalesForm } from "@/components/sales/create-sale-form"

export const Ventas = () => {

  const token = localStorage.getItem("token")

    return (
      <div>
        <CreateSalesForm token={token}/>
      </div>
    )
  
}
