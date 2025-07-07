import React from 'react'
import { TableHead } from '@/components/ui/table'
import { ChevronUp, ChevronDown } from 'lucide-react'

const TxnTableHead = ({ sortConfig, field, handleSort }: any) => {
    return <TableHead className="cursor-pointer" onClick={() => handleSort(`${field}`)}>
        <div className="flex items-center capitalize">
            {field}
            {sortConfig.field === `${field}` &&
                (sortConfig.direction === "asc" ? (
                    <ChevronUp className="ml-1 h-4 w-4" />
                ) : (
                    <ChevronDown className="ml-1 h-4 w-4" />
                ))}
        </div>
    </TableHead>
}

export default TxnTableHead