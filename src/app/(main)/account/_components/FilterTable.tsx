import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Trash, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BarLoader } from "react-spinners";

const FilterTable = ({ searchTerm, setSearchTerm, setCurrentPage, typeFilter, setTypeFilter, recurringFilter, setRecurringFilter, selectedIds, handleBulkDelete, deleteLoading }: any) => {

    const handleClearFilters = () => {
        setSearchTerm("");
        setTypeFilter("");
        setRecurringFilter("");
        setCurrentPage(1);
    };

    return <div className='space-y-4'>
        {deleteLoading && <BarLoader className="mt-4" width={"100%"} color="#9333ea" />}

        <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="pl-8"
                />
            </div>
            <div className="flex gap-2">
                <Select
                    value={typeFilter}
                    onValueChange={(value) => {
                        setTypeFilter(value);
                        setCurrentPage(1);
                    }}
                >
                    <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="INCOME">Income</SelectItem>
                        <SelectItem value="EXPENSE">Expense</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    value={recurringFilter}
                    onValueChange={(value) => {
                        setRecurringFilter(value);
                        setCurrentPage(1);
                    }}
                >
                    <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="All Transactions" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="recurring">Recurring Only</SelectItem>
                        <SelectItem value="non-recurring">Non-recurring Only</SelectItem>
                    </SelectContent>
                </Select>

                {/* Bulk Actions */}
                {selectedIds.length > 0 && (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleBulkDelete}
                        >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete Selected ({selectedIds.length})
                        </Button>
                    </div>
                )}

                {(searchTerm || typeFilter || recurringFilter) && (
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleClearFilters}
                        title="Clear filters"
                    >
                        <X className="h-4 w-5" />
                    </Button>
                )}
            </div>
        </div>
    </div>
}

export default FilterTable