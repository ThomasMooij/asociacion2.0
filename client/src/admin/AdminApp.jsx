import { SelectedComponentProvider } from "./context/AdminContext"
import Index from "./Index"

const AdminIndex = () => {
  return (
    <SelectedComponentProvider>
      <Index />
    </SelectedComponentProvider>
  )
}

export default AdminIndex
