import fetch from 'node-fetch'
import { WhatsappApiRepository } from '@Whatsapp/domain/repository/WhatsappApi.repository'

export class WhatsappApiHttpRepository implements WhatsappApiRepository {
  public async sendMessage(data: any): Promise<boolean> {
    const payload: any = null
    const options = {
      method: 'post',
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${process.env.CARRIER_DHL_TOKEN}`,
        contentType: 'application/json'
      }
    }
    const uri =
      'https://api-eu.dhl.com/track/shipments?' +
      new URLSearchParams(`trackingNumber=${data.tracking_number}&service=${data.service}`)
    const response: any = await fetch(uri, options)
    return response.OK && response.status >= 200 && response.status < 300
  }
}
