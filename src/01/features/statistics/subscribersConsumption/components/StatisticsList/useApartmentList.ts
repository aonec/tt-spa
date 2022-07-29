import { subscribersConsumptionFilterForm } from "./../../models/index";
import { $consumptionStatistics } from "../../models";
import { useStore } from "effector-react";
import { useForm } from "effector-forms/dist";
import _ from "lodash";
import moment from "moment";
import { SubscriberStatisticsСonsumptionResponse } from "../../../../../../api/types";

type IterateArrayCallback<T> = ((apartment: T) => boolean)[];

export function useApartmentList() {
  const apartmentList = useStore($consumptionStatistics);
  const { fields } = useForm(subscribersConsumptionFilterForm);

  const sortCallbacks: IterateArrayCallback<SubscriberStatisticsСonsumptionResponse> =
    [];

  const filterCallbacks: IterateArrayCallback<SubscriberStatisticsСonsumptionResponse> =
    [];

  if (
    fields.coldOpen.value &&
    typeof fields.cold.value.from === "number" &&
    typeof fields.cold.value.to === "number"
  ) {
    filterCallbacks.push((apartment) =>
      Boolean(
        typeof apartment.coldWaterSupplyСonsumption === "number" &&
          apartment.coldWaterSupplyСonsumption >=
            Number(fields.cold.value.from) &&
          apartment.coldWaterSupplyСonsumption <= Number(fields.cold.value.to)
      )
    );
  }

  if (
    fields.heatOpen.value &&
    typeof fields.heat.value.from === "number" &&
    typeof fields.heat.value.to === "number"
  ) {
    filterCallbacks.push((apartment) =>
      Boolean(
        typeof apartment.hotWaterSupplyСonsumption === "number" &&
          apartment.hotWaterSupplyСonsumption >=
            Number(fields.heat.value.from) &&
          apartment.hotWaterSupplyСonsumption <= Number(fields.heat.value.to)
      )
    );
  }

  if (
    fields.electricityOpen.value &&
    typeof fields.electricity.value.from === "number" &&
    typeof fields.electricity.value.to === "number"
  ) {
    filterCallbacks.push((apartment) =>
      Boolean(
        typeof apartment.electricitySupplyСonsumption === "number" &&
          apartment.electricitySupplyСonsumption >=
            Number(fields.electricity.value.from) &&
          apartment.electricitySupplyСonsumption <=
            Number(fields.electricity.value.to)
      )
    );
  }

  if (
    fields.individualDeviceCheckPeriod.value.from &&
    fields.individualDeviceCheckPeriod.value.to
  ) {
    filterCallbacks.push((apartment) => {
      const checkDate = moment(apartment.dateLastCheck);

      if (!checkDate.isValid()) return false;

      const isAfterThanFrom =
        checkDate.isSameOrAfter(
          moment(fields.individualDeviceCheckPeriod.value.from)
        ) ||
        checkDate.format("DD-MM-YYYY") ===
          moment(fields.individualDeviceCheckPeriod.value.from)?.format(
            "DD-MM-YYYY"
          );

      const isBeforeThanTo =
        checkDate.isSameOrBefore(
          moment(fields.individualDeviceCheckPeriod.value.to)
        ) ||
        checkDate.format("DD-MM-YYYY") ===
          moment(fields.individualDeviceCheckPeriod.value.to)?.format(
            "DD-MM-YYYY"
          );

      return isAfterThanFrom && isBeforeThanTo;
    });
  }

  if (fields.excludeApartments.value) {
    filterCallbacks.push((apartment) => {
      const checkDate = moment(apartment.dateLastCheck);

      if (!checkDate.isValid()) return false;

      return moment().diff(checkDate, "months") <= 3;
    });
  }

  const filteredApartmentList = apartmentList?.filter((elem) => {
    const checks = filterCallbacks.map((callback) => Boolean(callback(elem)));

    return checks.every(Boolean);
  });

  const sortedApartmentList = _.sortBy(
    filteredApartmentList,
    [(apartment) => Number(apartment.apartmentNumber), ...sortCallbacks],
    []
  );

  return { apartmentList: sortedApartmentList };
}
