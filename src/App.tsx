import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import "./App.css"
import { Button } from "./components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "./components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select"
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group"
import { Label } from "./components/ui/label"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

function App() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  // ...
  return (
    <>
      <div>
        <Dialog>
          <div className="flex justify-center items-center h-screen w-full">
            <DialogTrigger>
              <Button variant="outline">Upload Document</Button>
            </DialogTrigger>
          </div>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Document Upload</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="flex justify-between">
                  {/* left side */}
                  <div>
                    <FormField
                      control={form.control}
                      name="username"
                      render={() => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <div>
                                <Select>
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Import Name:" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div></div>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* right side */}
                  <div>
                    <FormField
                      control={form.control}
                      name="username"
                      render={() => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <div>
                                <div className="flex flex-col gap-2">
                                  <FormLabel>
                                    Split schedule using social distancing?
                                  </FormLabel>
                                  <RadioGroup defaultValue="comfortable">
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="default" id="r1" />
                                      <Label htmlFor="r1">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="comfortable"
                                        id="r2"
                                      />
                                      <Label htmlFor="r2">No</Label>
                                    </div>
                                  </RadioGroup>
                                </div>
                                <div>
                                  <FormLabel>Location Checking:</FormLabel>
                                  <div>All Available!</div>
                                </div>
                                <div>
                                  <FormLabel>Client:</FormLabel>
                                  <RadioGroup defaultValue="comfortable">
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="default" id="r1" />
                                      <Label htmlFor="r1">Single</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="comfortable"
                                        id="r2"
                                      />
                                      <Label htmlFor="r2">Multiple</Label>
                                    </div>
                                  </RadioGroup>
                                </div>
                              </div>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <div>
                    Data in the import file is correct. Please press Continue to
                    import.
                  </div>
                  <div className="justify-center gap-4 flex">
                    <Button type="submit">Continue Import</Button>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </DialogClose>
                  </div>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

export default App
