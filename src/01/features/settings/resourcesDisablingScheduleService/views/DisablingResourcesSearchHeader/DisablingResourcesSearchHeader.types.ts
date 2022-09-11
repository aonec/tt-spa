import { DisablingResourcesProps } from "../../ResourceDisablingScheduleContainer.types"

export type DisablingResourcesSearchProps = {
    applyFilters: (payload: DisablingResourcesProps) => void
    cities: string[] | null
    filters: DisablingResourcesProps
}