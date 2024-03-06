import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { MdOutlineDeleteForever } from "react-icons/md"
import { IoDocumentText } from "react-icons/io5"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { LuClock8 } from "react-icons/lu"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { DialogClose, DialogFooter } from "./ui/dialog"
import { Divider } from "./ui/divider"

const formSchema = z.object({
  importName: z.string().min(1),
  file_upload: z.string().min(1),
  split_schedule: z.boolean(),
  client: z.boolean(),
  testing_center: z.string().min(1),
})

const formLabelStyles = "text-xs font-extrabold text-[#233C6B]"

interface File {
  name: string
  preview: string
}

export function UploadDocumentForm() {
  const [docData, setDocData] = useState<File | undefined>(undefined)
  const [toggleChecked, setToggleChecked] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDrop = useCallback((acceptedFiles: any) => {
    setDocData(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      })
    )
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      importName: "",
      file_upload: "",
      split_schedule: false,
      client: false,
      testing_center: "",
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-between gap-16">
          {/* left side */}
          <div className="w-3/5">
            <FormField
              control={form.control}
              name="importName"
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
                            <SelectItem value="name1">Name 1</SelectItem>
                            <SelectItem value="name2">Name 2</SelectItem>
                            <SelectItem value="name3">Name 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="h-2"></div>
            <Divider />
            <div>
              <FormLabel className={formLabelStyles}>
                Select a manifest you'd like to import
              </FormLabel>
              <div className="h-3"></div>

              <FormField
                control={form.control}
                name="file_upload"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <div className="border p-4 rounded-2xl">
                        <div className="max-w-xl">
                          {docData != undefined ? (
                            <div className="flex justify-between items-center text-gray-600 w-full gap-2">
                              <img
                                className=" object-cover h-24 w-24 rounded"
                                src={docData.preview}
                              />
                              <div className="font-bold text-xs">
                                {docData.name}
                              </div>
                              <div
                                className="text-2xl text-red-500 cursor-pointer"
                                onClick={() => setDocData(undefined)}
                              >
                                <MdOutlineDeleteForever />
                              </div>
                            </div>
                          ) : (
                            <div {...getRootProps()}>
                              <input
                                {...getInputProps()}
                                type="file"
                                name="file_upload"
                                className="hidden"
                              />
                              <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                                <div className="flex items-center flex-col justify-center gap-2 w-full">
                                  <div className="text-[#F79C26] text-2xl">
                                    <IoDocumentText />
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    Drag & Drop Here Or{""}
                                    <span className="text-blue-600 font-bold px-1">
                                      Browse
                                    </span>
                                  </div>
                                </div>
                              </label>
                            </div>
                          )}
                        </div>
                        {docData === undefined && (
                          <div className="flex justify-center pt-4">
                            <div {...getRootProps()}>
                              <input
                                {...getInputProps()}
                                type="file"
                                name="file_upload"
                                className="hidden"
                              />
                              <label>
                                <Button>Upload Manifest</Button>
                              </label>
                            </div>
                          </div>
                        )}
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
                <div className="flex items-center space-x-2 w-[118px]">
                  <Switch
                    id="toggle-mode"
                    onCheckedChange={() => setToggleChecked(!toggleChecked)}
                  />
                  <Label htmlFor="toggle-mode" className="text-xs">
                    Toggle {toggleChecked ? "ON" : "OFF"}
                  </Label>
                </div>
                {" | "}
                <div className="flex items-center gap-1">
                  <div className="text-xl rotate-[270deg]">
                    <LuClock8 />
                  </div>
                  <Label className="text-xs">Select Tolerance Level</Label>
                </div>
              </div>
            </div>
          </div>
          {/* right side */}
          <div className="w-2/5">
            <FormField
              control={form.control}
              name="split_schedule"
              render={() => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-5">
                      <FormLabel className={formLabelStyles}>
                        Split schedule using social distancing?
                      </FormLabel>
                      <RadioGroup>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="r1" />
                          <Label htmlFor="r1">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="r2" />
                          <Label htmlFor="r2">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="h-3"></div>
            <Divider fullWidth />

            <LabelFull
              labelName="Location Checking:"
              description="All Available!"
            />

            <Divider fullWidth />

            <FormField
              control={form.control}
              name="client"
              render={() => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-5">
                      <FormLabel className={formLabelStyles}>Client:</FormLabel>
                      <RadioGroup>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="single" id="r1" />
                          <Label htmlFor="r1">Single</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="multiple" id="r2" />
                          <Label htmlFor="r2">Multiple</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-4 mt-8">
              {Array(4)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <p className="text-xs text-[#233C6B]">
                      Testing Center {i + 1}
                    </p>

                    <FormField
                      control={form.control}
                      name="testing_center"
                      render={() => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <div className="flex items-center gap-2">
                                <Select>
                                  <SelectTrigger className="w-[140px] text-xs">
                                    <SelectValue placeholder="Select Client:" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                  </SelectContent>
                                </Select>
                                <div className="text-xl rotate-[270deg]">
                                  <LuClock8 />
                                </div>
                              </div>
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
          <div className="font-bold text-[#233C6B]">
            Data in the import file is correct. Please press Continue to import.
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
  )
}

interface LabelProps {
  labelName: string
  description: string
}

function LabelFull({ labelName, description }: LabelProps) {
  return (
    <div className="mb-2">
      <FormLabel className={formLabelStyles}>{labelName}</FormLabel>
      <div className="text-xs font-bold text-green-500">{description}</div>
    </div>
  )
}
