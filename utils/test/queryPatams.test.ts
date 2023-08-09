import { SortFilter } from "@/store/features/sortFilter";
import { generateSortFilterParams } from "../queryParams"; // Update the path accordingly

const mockSortFilterData: SortFilter = {
    dropdowns: {
        order: {
            selectedItems: ['asc'],
            isDropdown: false,
            defaultValue: []
        },
        tags: {
            selectedItems: ['tag1', 'tag2'],
            isDropdown: false,
            defaultValue: []
        },
        platforms: {
            selectedItems: ['platform1', 'platform2'],
            isDropdown: false,
            defaultValue: []
        },
        players: {
            selectedItems: ['Players'],
            isDropdown: false,
            defaultValue: []
        },
        developer: {
            selectedItems: ['developer1'],
            isDropdown: false,
            defaultValue: []
        },
    },
    amount: 5,
    expand: false
};

test('generateSortFilterParams returns correct URLQueryObject', () => {
  const href = 'https://example.com';
  const result = generateSortFilterParams(mockSortFilterData, href);

  expect(result).toEqual({
    pathname: href,
    query: {
      order: 'asc',
      tags: ['tag1', 'tag2'],
      platforms: ['platform1', 'platform2'],
      players: '',
      developer: 'developer1',
      amount: 5,
    },
  });
});
