"use client";
import { Control } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { GenderOptions } from "@/lib/constants";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { E164Number } from "libphonenumber-js/core";
interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  showTimeSelect?: boolean;
  dateFormat?: string;
  options?: { value: string; label: string; image?: string }[];
  renderOption?: (option: {
    value: string;
    label: string;
    image?: string;
  }) => JSX.Element;
}
export const CustomTextInput = ({
  control,
  iconSrc,
  iconAlt = "icon",
  label,
  name,
  placeholder,
  disabled,
}: CustomProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel className="shad-input-label">{label}</FormLabel>
          <div className="flex rounded-md border border-dark-500 bg-dark-400">
            {iconSrc && (
              <Image
                src={iconSrc}
                height={24}
                width={24}
                alt={iconAlt}
                className="ml-2"
              />
            )}
            <Input
              id={name}
              className="shad-input border-0"
              {...field}
              placeholder={placeholder}
              disabled={disabled}
            />
          </div>
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export const CustomPhoneInput = ({
  control,
  name,
  label,
  placeholder,
  disabled,
}: CustomProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel className="shad-input-label">{label}</FormLabel>
          <PhoneInput
            {...field}
            placeholder={placeholder}
            id={name}
            defaultCountry="NG"
            international
            className="input-phone"
            withCountryCallingCode
            value={(field.value as E164Number) || ""}
            onChange={field.onChange}
            disabled={disabled}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export const CustomDatePicker = ({
  control,
  name,
  label,
  showTimeSelect = false,
  dateFormat = "MM/dd/yyyy",
}: CustomProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel className="shad-input-label">{label}</FormLabel>
          <div className="flex items-center rounded-md border border-dark-500 bg-dark-400">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar icon"
              className="ml-2"
            />
            <FormControl>
              <ReactDatePicker
                selected={field.value}
                onChange={(date: Date | null) => field.onChange(date)}
                showTimeSelect={showTimeSelect}
                timeInputLabel="Time:"
                dateFormat={dateFormat}
                wrapperClassName="date-picker"
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export const CustomCheckbox = ({ control, name, label }: CustomProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={name} className="checkbox-label">
              {label}
            </label>
          </div>
        </FormControl>
      )}
    />
  );
};
export const CustomRadiobutton = ({ control, name, label }: CustomProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel className="shad-input-label">{label}</FormLabel>
          <RadioGroup
            className="flex h-11 gap-6 xl:justify-between"
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            {GenderOptions.map((option, i) => (
              <div key={option + i} className="radio-group">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export const CustomSelect = ({
  control,
  name,
  label,
  placeholder,
  disabled,
  options,
  renderOption,
}: CustomProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel className="shad-input-label">{label}</FormLabel>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={disabled}
            >
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="shad-select-content">
                {options.map((option, index) => (
                  <SelectItem key={index} value={option.value}>
                    {renderOption ? renderOption(option) : option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};
export const CustomTextArea = ({
  control,
  label,
  name,
  placeholder,
}: CustomProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel className="shad-input-label">{label}</FormLabel>
          <Textarea
            id={name}
            className="shad-textArea"
            {...field}
            placeholder={placeholder}
          />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};
