'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandInput } from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CategorySelectorComponent({ categories }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const router = useRouter()

  return(
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-full relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 hover:text-white text-white font-bold py-2 px-4 rounded"
        >
          {
            value
            ? categories.find((categorie) => categorie._id === value)?.title
            : "Filter op categorie"
          }
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Zoek categorie"
            className="h-9"
            onKeyDown={(e) =>{
              if (e.key === "Enter") {
                const selectedCategory = categories.find((c) =>
                c.title?.toLowerCase().includes(e.currentTarget.value.toLowerCase()))
              }
              if (selectedCategory?.slug?.current) {
                setValue(selectedCategory._id)
                router.push(`/categories/${selectedCategory.slug.current}`)
                setOpen(false)
              }
            }}
          />
          <CommandList>
            <CommandEmpty>Geen categorie gevonden.</CommandEmpty>
            <CommandGroup>
              {
                categories.map((category) =>(
                  <CommandItem
                    key={category._id}
                    value={category.title}
                    onSelect={() => {
                      setValue(value === category._id ? "" : category._id)
                      router.push(`/categories/${category.slug.current}`)
                      setOpen(false)
                    }}
                  >
                    {category.title}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === category._id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))
              }
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
