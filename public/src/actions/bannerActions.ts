import { FluxStandardAction, AsyncAction } from 'redux-promise-middleware';
import AsyncFunction from '../utils/AsyncFunction';
import Banner from '../models/Banner';
import { HTTP_SERVER_URL } from '../configuration';

export const ActionTypes = Object.freeze({
  AddBanner: 'ADD_BANNER',
  DeleteBanner: 'DELETE_BANNER',
  GetBanners: new AsyncFunction('GET_BANNERS'),
  HideBanner: 'HIDE_BANNER'
});

export const addBanner = (message: string, startTime: number, endTime: number): FluxStandardAction => ({
  type: ActionTypes.AddBanner,
  payload: { message, startTime, endTime }
});

export const deleteBanner = (id: number): FluxStandardAction => ({
  type: ActionTypes.DeleteBanner,
  payload: { id }
});

export const loadBanners = (): AsyncAction => ({
  type: ActionTypes.GetBanners,
  payload: fetch(`${HTTP_SERVER_URL}/api/banners`)
            .then(response => response.json())
            .then((response: any) => response.banners.map((res: any) => new Banner(res)))
});

export const hideBanner = (id: number): FluxStandardAction => ({
  type: ActionTypes.HideBanner,
  payload: { id }
});
