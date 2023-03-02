import { TelegramApiRepository } from '@Telegram/domain/repository/TelegramApi.repository';
import fetch from 'node-fetch';
import { DhlTrackingModel } from '../model/DhlTracking.model';

export class TelegramApiHttpRepository implements TelegramApiRepository {
  public async syncDhlTracking(tracking: any): Promise<boolean> {
    const payload: DhlTrackingModel = DhlTrackingModel.fromEntity(tracking);
    const options = {
      method: 'post',
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${process.env.CARRIER_DHL_TOKEN}`,
        contentType: 'application/json',
      },
    };
    const uri =
      `https://api-eu.dhl.com/track/shipments?` +
      new URLSearchParams(
        `trackingNumber=${tracking.tracking_number}&service=${tracking.service}`,
      );
    const response: any = await fetch(uri, options);
    return response.OK && response.status >= 200 && response.status < 300;
  }
}
