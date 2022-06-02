import { SearchApartmentsPayload } from "../../displayApartmentsListService.types";

export type ApartmentsSearchProps = {
  handleSearch: (payload: SearchApartmentsPayload) => void;
};
