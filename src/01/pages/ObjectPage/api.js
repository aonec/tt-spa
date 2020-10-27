export const api = {
  URL: "/housingstocks/",
  getObjects() {
    return {
      url: this.URL,
    }
  },
  getObjectId(id) {
    return {
      url: this.URL + id,
    }
  },
  getObjectDevices(id) {
    return { url: this.getObjectId(id).url + "/devices/" }
  },

  getDeviceId(objId, devId) {
    return { url: this.getObjectDevices(objId).url + devId }
  },

  getApartments(HousingStockNumber, city, street) {
    return {
      url: "Apartments",
      params: { city, street, HousingStockNumber },
    }
  },
  getDeviceDevices(objId, devId) {
    return { url: this.getDeviceId(objId, devId).url + "/related/" }
  },
  getDevicePipes(objId, devId) {
    return { url: this.getDeviceId(objId, devId).url + "/communicationpipes" }
  },
}
