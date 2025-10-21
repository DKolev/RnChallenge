import { filterMarkersInViewport } from '../../../src/utils/mapUtils';
import { MapPin } from '../../../src/types/components';
import { mockRegion, mockPins } from '../../mocks/mockData';

describe('mapUtils', () => {
  describe('filterMarkersInViewport', () => {
    it('should filter markers within region bounds', () => {
      const result = filterMarkersInViewport(mockPins, mockRegion);
      expect(result).toHaveLength(3);
      expect(result[0]._id).toBe('1');
    });

    it('should handle null/undefined markers', () => {
      const markersWithNull: MapPin[] = [
        null as any,
        mockPins[0],
        undefined as any,
      ];
      const result = filterMarkersInViewport(markersWithNull, mockRegion);
      expect(result).toHaveLength(1);
    });

    it('should handle empty marker array', () => {
      const result = filterMarkersInViewport([], mockRegion);
      expect(result).toEqual([]);
    });
  });
});
