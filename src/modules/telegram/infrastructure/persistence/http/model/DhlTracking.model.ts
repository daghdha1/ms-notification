import { partialAssign } from 'pkg-shared';

export class DhlTrackingModel {
  public tracking_number: string;
  public service: string;

  public static fromEntity(entity: any): DhlTrackingModel {
    return partialAssign(new DhlTrackingModel(), {
      tracking_number: entity.tracking_number,
      service: entity.service,
    });
  }
}
