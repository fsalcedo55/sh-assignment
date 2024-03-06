import "./App.css"
import { Button } from "./components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog"
import { Divider } from "./components/ui/divider"
import { UploadDocumentForm } from "./components/uploadDocumentForm"
import { Toaster } from "sonner"

function App() {
  return (
    <>
      <Toaster richColors />
      <Dialog>
        <div className="flex justify-center items-center h-screen w-full">
          <DialogTrigger>
            <Button variant="secondary">Upload Document</Button>
          </DialogTrigger>
        </div>
        <DialogContent className="py-10 px-16">
          <DialogHeader>
            <DialogTitle>
              <div className="flex justify-center">
                <div className="flex flex-col w-[240px]">
                  <div className="text-[#233C6B]">Document Upload</div>
                  <div>
                    <Divider fullWidth />
                  </div>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          <UploadDocumentForm />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default App
