export const LOCAL_STORAGE_KEYS = {
  CART: 'cart',
}

export enum StatusEnum {
  ALL = 'all',
  PLANNED = 'электроника',
  ONGOING = 'бытовая техника',
  FINISHED = 'аксессуары',
}

export interface FilterByStatusVariants {
  id: number
  name: string
  value: StatusEnum
}

export const filterByStatusVariants: FilterByStatusVariants[] = [
  { id: 0, name: 'All', value: StatusEnum.ALL },
  { id: 1, name: 'Электроника', value: StatusEnum.PLANNED },
  { id: 2, name: 'Бытовая техника', value: StatusEnum.ONGOING },
  { id: 3, name: 'Аксессуары', value: StatusEnum.FINISHED },
]
