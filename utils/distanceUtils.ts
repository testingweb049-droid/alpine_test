export const calculateDistance = async (
  fromLatLng: { lat: number; lng: number } | null,
  toLatLng: { lat: number; lng: number } | null
): Promise<number | null> => {
  if (!fromLatLng || !toLatLng) return null;
  if (typeof window === "undefined") return null;

  const google = (window as any).google;
  if (!google || !google.maps) return null;

  return new Promise((resolve) => {
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [new google.maps.LatLng(fromLatLng.lat, fromLatLng.lng)],
        destinations: [new google.maps.LatLng(toLatLng.lat, toLatLng.lng)],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      (response: any, status: string) => {
        if (status !== "OK") return resolve(null);
        const distanceMeters = response.rows?.[0]?.elements?.[0]?.distance?.value || null;
        if (!distanceMeters) return resolve(null);
        resolve(Math.round((distanceMeters / 1000) * 100) / 100); // km with 2 decimals
      }
    );
  });
};
