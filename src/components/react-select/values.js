export const regionOptions = [
  { value: 1, label: "منطقه 1" },
  { value: 2, label: "منطقه 2" },
  { value: 3, label: "منطقه 3" },
  { value: 4, label: "منطقه 4" },
  { value: 5, label: "منطقه 5" },
  { value: 6, label: "منطقه 6" },
  { value: 7, label: "منطقه 7" },
  { value: 8, label: "منطقه 8" },
];
export const transferTypeOptions = [
  { value: 1, label: "فروش" },
  { value: 2, label: "پیش فروش" },
  { value: 3, label: "رهن و اجاره" },
  { value: 4, label: "رهن کامل" },
];
export const estateTypeOptions = [
  { value: 1, label: "آپارتمان" },
  { value: 2, label: "ویلایی" },
  { value: 3, label: "مغازه" },
  { value: 4, label: "دفتر کار" },
  { value: 5, label: "زمین" },
];
export const ageOptions = [
  { value: 1, label: "نوساز" },
  { value: 2, label: "یک سال" },
  { value: 3, label: "دو سال" },
  { value: 4, label: "سه سال" },
  { value: 5, label: "چهار سال" },
  { value: 6, label: "پنج سال" },
  { value: 7, label: "شش سال" },
  { value: 8, label: "هفت سال و بیشتر" },
];
export const dcmTypeOptions = [
  { value: 1, label: "شش دانگ" },
  { value: 2, label: "سه دانگ" },
  { value: 3, label: "وکالتی" },
  { value: 4, label: "قولنامه" },
];
export const roomsOptions = [
  { value: 1, label: "یک خواب" },
  { value: 2, label: "دو خواب" },
  { value: 3, label: "سه خواب" },
  { value: 4, label: "چهار خواب" },
  { value: 5, label: "پنج خواب" },
  { value: 6, label: "شش خواب" },
  { value: 7, label: "هفت خواب" },
];
export const floorOptions = [
  { value: 1, label: "زیر زمین" },
  { value: 2, label: "همکف" },
  { value: 3, label: "اول" },
  { value: 4, label: "دوم" },
  { value: 5, label: "سوم" },
  { value: 6, label: "چهارم" },
  { value: 7, label: "پنجم" },
];
export const optionsOptions = [
  { value: 1, label: "پارکینگ" },
  { value: 2, label: "آسانسور" },
];
export const parkingOptions = [
  { value: 1, label: "دارد" },
  { value: 0, label: "ندارد" },
];
export const elevatorOptions = [
  { value: 1, label: "دارد" },
  { value: 0, label: "ندارد" },
];

/////////////////Form edit

export const tempRegionOptions = regionOptions.map((option) => ({
  value: option.value,
  label: option.label,
}));

export const tempEstateTypeOptions = estateTypeOptions.map((option) => ({
  value: option.value,
  label: option.label,
}));

export const tempTransferTypeOptions = transferTypeOptions.map((option) => ({
  value: option.value,
  label: option.label,
}));

export const tempDcmTypeOptions = dcmTypeOptions.map((option) => ({
  value: option.value,
  label: option.label,
}));

export const tempParkingOptions = parkingOptions.map((option) => ({
  value: option.value,
  label: option.label,
}));
export const tempElevatorOptions = elevatorOptions.map((option) => ({
  value: option.value,
  label: option.label,
}));

///////////////lookupData

export const estateType = {
  1: "آپارتمان",
  2: "ویلایی",
  3: "مغازه",
  4: "دفتر کار",
  5: "زمین",
};
export const transferType = {
  1: "فروش",
  2: "پیش فروش",
  3: "رهن و اجاره",
  4: "رهن کامل",
};
export const dcmType = {
  1: "شش دانگ",
  2: "سه دانگ",
  3: "وکالتی",
  4: "قولنامه",
};
export const parking = {
  1: "دارد",
  0: "ندارد",
};
export const elevator = {
  1: "دارد",
  0: "ندارد",
};
export const region = {
  1: "منطقه 1",
  2: "منطقه 2",
  3: "منطقه 3",
  4: "منطقه 4",
  5: "منطقه 5",
  6: "منطقه 6",
  7: "منطقه 7",
  8: "منطقه 8",
};
