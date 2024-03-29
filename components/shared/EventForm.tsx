"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
//import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from "@/lib/validator"
import * as z from "zod"
import { eventDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import {FileUploader} from "./FileUploader"
import { useState } from "react"
import Image from "next/image"
import { Checkbox } from "../ui/checkbox"



type EventFormProps = {
    userId: string
    type: "Create" | "Update"
}
const EventForm = ({userId, type}: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([])
  const initialValues = eventDefaultValues;

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  })
 
  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    console.log(values)
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

      <div className="flex flex-col gap-5 md:flex-row">
        <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <Input placeholder="Event Title" {...field} className="input-field" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name="categoryId"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <Dropdown onChangeHandler = {field.onChange} value = {field.value} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl className="h-72">
              <Textarea placeholder="Event Description" {...field} className="textarea rounded-2xl" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name="imageUrl"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl className="h-72">
              <FileUploader
                onFieldChange={field.onChange}
                imageUrl = {field.value} 
                setFiles= {setFiles}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                <Image 
                  src="/assets/icon/location-grey.svg"
                  alt="location-img"
                  width={24}
                  height={24}
                  />
                  <Input placeholder="Event location or Online" {...field} className="input-field" />
              </div>
              
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
      <FormField
        control={form.control}
        name="startDateTime"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                <Image 
                  src="/assets/icon/calendar.svg"
                  alt="calender-img"
                  width={24}
                  height={24}
                  className="filter-grey"
                  />
                  <p className="ml-3 whitespace-nowrap text-grey-600">Start Date:</p>
                  <DatePicker selected={field.value} onChange={(date: Date) => field.onChange(date)} 
                  showTimeSelect timeInputLabel="Time:" dateFormat="dd/MM/yyyy h:mm aa"
                  wrapperClassName="datePicker"/>
              </div>
              
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
      <FormField
        control={form.control}
        name="endDateTime"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                <Image 
                  src="/assets/icon/calendar.svg"
                  alt="calender-img"
                  width={24}
                  height={24}
                  className="filter-grey"
                  />
                  <p className="ml-3 whitespace-nowrap text-grey-600">End Date:</p>
                  <DatePicker selected={field.value} onChange={(date: Date) => field.onChange(date)} 
                  showTimeSelect timeInputLabel="Time:" dateFormat="dd/MM/yyyy h:mm aa"
                  wrapperClassName="datePicker"/>
              </div>
              
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                <Image 
                  src="/assets/icon/rupee-icon.svg"
                  alt="rupee-img"
                  width={12}
                  height={12}
                  className="filter-grey"
                  />
                  <Input type="number" placeholder="Price" {...field} className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"/>
                  <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center">
                            <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Free Ticket</label>
                              <Checkbox id="isFree" onCheckedChange={field.onChange} checked={field.value} className="mr-2 h-5 w-5 border-2 border-orange-500"/>
                          </div>
                        </FormControl>
                      <FormMessage />
                      </FormItem>
                      )}
                    />
              </div>
              
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name="url"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                <Image 
                  src="/assets/icon/link.svg"
                  alt="link-img"
                  width={24}
                  height={24}
                  />
                  <Input placeholder="Enter URL" {...field} className="input-field" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
      </div>
      <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className=" button col-span-2 w-full bg-orange-500 hover:bg-orange-600">{form.formState.isSubmitting?('Submitting...'):`${type} Event`}</Button>
    </form>
  </Form>
  )
}

export default EventForm
