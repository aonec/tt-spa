import { stringify } from "query-string";
import { axios } from "../../api/axios";
import {
  AddApartmentActRequest,
  ApartmentActResponsePagedList,
  EActResourceTypeStringDictionaryItem,
  EActTypeStringDictionaryItem,
} from "../../api/types";
import { ApartmentActPaginationParameters, MayBe } from "../features/actsJournal/displayActsJournal/models";

export const getApartmentActTypes = (): Promise<
  MayBe<EActTypeStringDictionaryItem[]>
> => axios.get("ApartmentActs/ActTypes");

export const getActResources = (): Promise<
  MayBe<EActResourceTypeStringDictionaryItem[]>
> => axios.get("ApartmentActs/ActResourceTypes");

export const getApartmentActs = async (
  params: ApartmentActPaginationParameters
): Promise<ApartmentActResponsePagedList | null> => {
  const res: ApartmentActResponsePagedList = await axios.get(
    `ApartmentActs?${stringify(params, {
      arrayFormat: "none",
      skipEmptyString: true,
      skipNull: true,
    })}`
  );

  return res;
};

export const addApartmentActs = (
  payload: AddApartmentActRequest
): Promise<void> => axios.post("ApartmentActs", payload);
