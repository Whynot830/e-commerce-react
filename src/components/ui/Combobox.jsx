import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'
import { CommandList } from 'cmdk'

const Combobox = ({ data, itemName, value, setValue, caption = `Select ${itemName}...`, withSearch = false }) => {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className='min-w-[40px] w-fit' asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className='min-w-[150px] justify-between'
                >
                    {value?.toUpperCase() ?? caption}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
                <Command>
                    {withSearch && (
                        <CommandInput placeholder={`Search ${itemName}...`} />
                    )}
                    <CommandEmpty>{`No ${itemName} found`}</CommandEmpty>
                    <CommandList>
                        <CommandGroup>
                            {data.map((item, idx) => (
                                <CommandItem
                                    key={idx}
                                    value={item.value}
                                    onSelect={() => {
                                        setValue(item)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            value === item.name ? 'opacity-100' : 'opacity-0'
                                        )}
                                    />
                                    {item.name?.toUpperCase()}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover >
    )
}

export default Combobox