export const yelpApiKey =
  "cLCckwvPZ64EAo3l2oCqdkYwO92JumAudkV78b84mY_4StYXylEUG0u4R6exM-pnEv3OGRQK16VM_jvgBWBHTwR0jqrBEmhLOWNYTEuaSoodzEYYMAl2PW9ZWBSOZnYx";

export async function getYelpData(map) {
  const location = "Toronto"; // You can dynamically get this value from user input
  const category = "cafes"; // You can dynamically get this value from user input

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${yelpApiKey}`,
      "Content-Type": "application/json",
    },
  };
}
