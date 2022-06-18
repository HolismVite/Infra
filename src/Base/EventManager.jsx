import EventEmitter from 'eventemitter3'
const eventEmitter = new EventEmitter();

const EventManager = {
    on: (event, fn) => eventEmitter.on(event, fn),
    off: (event, fn) => eventEmitter.off(event, fn),
    emit: (event, payload) => eventEmitter.emit(event, payload),
    removeListener: (event, fn) => eventEmitter.removeListener(event, fn),
    listeners: (event) => eventEmitter.listeners(event),
    eventEmitter: eventEmitter,
    formSubmitted: 'form_submission_requested',
    formCanceled: 'form_canceled',
    accountUpdated: 'account_updated',
    itemUpserted: 'item_upserted',
    showMessage: 'show_message',
    reloadRequested: 'reload_requested',
    makeRoom: 'make_room',
    returnBackToNormalForm: 'return_back_to_normal_form',
    editRequested: 'edit_requested',
    entitySelected: 'entity_slected',
    entityActionDialogRequested: 'item_action_dialog_requested',
    entityReloadRequested: 'entity_reload_requested',
    entityRerenderRequested: 'set_entity_requested',
    runMethod: 'run_method'
};
export default EventManager;