import React from 'react'
import { Card, CardContent } from '../../../Components/ui/card'
import { Filter, Search } from 'lucide-react'
import { Input } from '../../../Components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../Components/ui/select'
import { Button } from '../../../Components/ui/button'

type State = {
    id: string;
    value:string;
}

const FilterSearch = ({data , data2 , searchQuery , setSearchQuery , statusFilter , setStatusFilter , categoryFilter , setCategoryFilter}) => {
    return (
        <Card className="mb-6">
            <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search products..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    data.map((state: State) => (
                                        <SelectItem key={state.id} value={state.id}>{state.value}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    data2.map((state: State) => (
                                        <SelectItem key={state.id} value={state.id}>{state.value}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                        <Button variant="outline" size="icon" className="shrink-0">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default FilterSearch