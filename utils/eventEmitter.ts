import EventEmitter from "eventemitter3";

export const eventEmitter = new EventEmitter();

export enum EVENT_TYPE {
	ACTIVITY_CONFIG_UPDATED = 'ACTIVITY_CONFIG_UPDATED'
}