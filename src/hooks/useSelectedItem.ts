import { useMemo, useState } from 'react'

export function useSelectedItem<TItem>(items: readonly TItem[]) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectedItem = useMemo(() => items[selectedIndex] ?? items[0], [items, selectedIndex])

  return {
    selectedIndex,
    selectedItem,
    selectItem: setSelectedIndex,
  }
}
