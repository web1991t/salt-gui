package org.riversoft.salt.gui.exception

class MinionNotRegisteredOnSaltException extends BasicSaltGuiException {

    MinionNotRegisteredOnSaltException(String message, int code, String localizedMessage) {
        super(message, code)
        this.code = code
        this.localizedKey = localizedMessage
    }

    MinionNotRegisteredOnSaltException(String message, String localizedMessage, Object[] params) {
        super(message)
        this.localizedKey = localizedMessage
        this.params = params
    }

    MinionNotRegisteredOnSaltException(String message) {
        super(message)
    }
}
