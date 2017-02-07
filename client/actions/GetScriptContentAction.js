import {
    SCRIPT_CONTENT_REQUEST,
    SCRIPT_CONTENT_SUCCESS,
    SCRIPT_CONTENT_FAIL
} from '../constants/GetScriptContent';
import $ from 'jquery'

export function getScriptContent(scriptName) {

    return (dispatch) => {

        dispatch({
            type: SCRIPT_CONTENT_REQUEST
        });

        $.ajax({
            url: '/script-by-name',
            data: {name: scriptName},
            type: 'get',
            success: function(data) {
                dispatch({
                    type: SCRIPT_CONTENT_SUCCESS,
                    payload: data
                });
            },
            error: function (data) {
                console.log(data);
                dispatch({
                    type: SCRIPT_CONTENT_FAIL,
                    error: true,
                    payload: data.responseJSON
                });
            }
        })

    }
}