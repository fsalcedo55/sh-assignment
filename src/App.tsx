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
import { Switch } from "./components/ui/switch"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

const formLabelStyles = "text-xs font-bold"

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
      <Dialog>
        <div className="flex justify-center items-center h-screen w-full">
          <DialogTrigger>
            <Button variant="outline">Upload Document</Button>
          </DialogTrigger>
        </div>
        <DialogContent className="py-10 px-16">
          <DialogHeader>
            <DialogTitle>
              <div className="flex justify-center">
                <div className="flex flex-col w-[240px]">
                  <div>Document Upload</div>
                  <div>
                    <Divider fullWidth />
                  </div>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex justify-between gap-16">
                {/* left side */}
                <div className="w-3/5">
                  <FormField
                    control={form.control}
                    name="username"
                    render={() => (
                      <FormItem>
                        <FormControl>
                          <div>
                            <div>
                              <Select>
                                <SelectTrigger className="w-full">
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
                  <Divider />
                  <div>
                    <FormLabel className={formLabelStyles}>
                      Select a manifest you'd like to import
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="username"
                      render={() => (
                        <FormItem>
                          <FormControl>
                            <div className="border p-4 rounded-2xl">
                              <div className="max-w-xl">
                                <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                                  <span className="flex items-center space-x-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="w-6 h-6 text-gray-600"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                      />
                                    </svg>
                                    <span className="font-medium text-gray-600">
                                      Drag & Drop Here Or{""}
                                      <span className="text-blue-600 underline px-1">
                                        Browse
                                      </span>
                                    </span>
                                  </span>
                                  <input
                                    type="file"
                                    name="file_upload"
                                    className="hidden"
                                  />
                                </label>
                              </div>
                              <div className="flex justify-center pt-4">
                                <Button size="sm">Upload Manifest</Button>
                              </div>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Divider />
                  <LabelFull
                    labelName="Elapse Data Checking"
                    description="No Elapsed Dates!"
                  />
                  <Divider />
                  <div className="flex flex-col gap-2">
                    <FormLabel className={formLabelStyles}>
                      Tolerance Window:
                    </FormLabel>
                    <div className="flex gap-2 items-center">
                      <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" />
                        <Label htmlFor="airplane-mode" className="text-xs">
                          Toggle Mode
                        </Label>
                      </div>
                      {" | "}
                      <div>
                        <Label className="text-xs">
                          Select Tolerance Level
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* right side */}
                <div className="w-2/5">
                  <FormField
                    control={form.control}
                    name="username"
                    render={() => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-col gap-2">
                            <FormLabel className={formLabelStyles}>
                              Split schedule using social distancing?
                            </FormLabel>
                            <RadioGroup defaultValue="comfortable">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="default" id="r1" />
                                <Label htmlFor="r1">Yes</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="comfortable" id="r2" />
                                <Label htmlFor="r2">No</Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Divider fullWidth />

                  <LabelFull
                    labelName="Location Checking:"
                    description="All Available!"
                  />

                  <Divider fullWidth />

                  <FormField
                    control={form.control}
                    name="username"
                    render={() => (
                      <FormItem>
                        <FormControl>
                          <div>
                            <FormLabel className={formLabelStyles}>
                              Client:
                            </FormLabel>
                            <RadioGroup defaultValue="comfortable">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="default" id="r1" />
                                <Label htmlFor="r1">Single</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="comfortable" id="r2" />
                                <Label htmlFor="r2">Multiple</Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Divider fullWidth />

                  <div className="flex flex-col gap-3">
                    {Array(4)
                      .fill(null)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between"
                        >
                          <p className="text-xs">Testing Center {i + 1}</p>

                          <FormField
                            control={form.control}
                            name="username"
                            render={() => (
                              <FormItem>
                                <FormControl>
                                  <div>
                                    <div>
                                      <Select>
                                        <SelectTrigger className="w-[140px] text-xs">
                                          <SelectValue placeholder="Select Client:" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="light">
                                            Light
                                          </SelectItem>
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
                      ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <div className="font-bold">
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
    </>
  )
}

interface DividerProps {
  fullWidth?: boolean
}

function Divider({ fullWidth }: DividerProps) {
  return (
    <div className="relative h-8">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-[1%] border-t border-gray-800" />
        {fullWidth ? (
          <div className="w-[99%] border-t border-gray-300" />
        ) : (
          <div className="w-[59%] border-t border-gray-300" />
        )}
      </div>
    </div>
  )
}

interface LabelProps {
  labelName: string
  description: string
}

function LabelFull({ labelName, description }: LabelProps) {
  return (
    <div>
      <FormLabel className={formLabelStyles}>{labelName}</FormLabel>
      <div className="text-xs font-bold text-green-500">{description}</div>
    </div>
  )
}

export default App
