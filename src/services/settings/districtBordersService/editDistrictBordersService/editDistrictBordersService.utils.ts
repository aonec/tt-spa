export function compareHouses(
  housesByFront: number[],
  housesByServer: number[] | undefined,
): { housesForDelete: number[]; housesForAdd: number[] } {
  const housesForDelete: number[] = housesByServer
    ? housesByServer.filter((house) => !housesByFront.includes(house))
    : [];
  const housesForAdd: number[] = housesByFront.filter(
    (house) => !housesByServer || !housesByServer.includes(house),
  );
  return { housesForDelete, housesForAdd };
}
