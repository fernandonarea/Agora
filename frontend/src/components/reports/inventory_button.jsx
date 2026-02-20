import { useReport } from "@/hooks/useReport";
//import { Button } from "@/components/ui/button";

export const InventoryButton = ({token}) => {
    const {allProductsReport, loading} = useReport()

    const handleDownload = async () => {
        try {
            await allProductsReport(token)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <button onClick={handleDownload} disabled={loading} >
            Export
        </button>
    );
}