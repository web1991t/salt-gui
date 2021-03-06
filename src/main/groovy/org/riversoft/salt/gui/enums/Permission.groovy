package org.riversoft.salt.gui.enums

enum Permission {

    /**
     * Супер пользователь которому все разрешено
     */
    ROLE_ROOT,

    //region MAIN PAGE PERMISSIONS

    /**
     * Разрешение просматривать главную страницу
     */
     ROLE_PAGE_MAIN,

    /**
     * Разрешение просматривать блок с количествами
     * миньонов сгрупированных по статусам на главной странице
     */
     ROLE_SHOW_MINIONS_COUNTS_STATUS,

    /**
     * Разрешение просматривать блок с количествами
     * миньонов сгрупированных по группам на главной странице
     */
     ROLE_SHOW_MINIONS_COUNTS_GROUP,

    /**
     * Разрешение просматривать принятые миньоны на главной странице
     */
     ROLE_SHOW_ACCEPTED_MINIONS,

    /**
     * Разрешение просматривать отказанные миньоны на главной странице
     */
     ROLE_SHOW_DENIED_MINIONS,

    /**
     * Разрешение просматривать отклоненные миньоны на главной странице
     */
     ROLE_SHOW_REJECTED_MINIONS,

    /**
     * Разрешение просматривать не принятые миньоны на главной странице
     */
     ROLE_SHOW_UNACCEPTED_MINIONS,

    /**
     * Разрешение принять миньон
     */
    ROLE_ACCEPT_MINION,

    /**
     * Разрешение удалить миньон
     */
     ROLE_DELETE_MINION,

    /**
     * Разрешение отклонить миньон
     */
     ROLE_REJECT_MINION,

    //endregion

     //region GROUPS AND MINIONS PAGE PERMISSIONS

     /**
     * Разрешение просматривать страницу миньонов
     */
     ROLE_PAGE_GROUPS_AND_MINIONS,

    /**
     * Разрешение просматривать сгрупированные миньоны по группам на странице миньонов
     */
     ROLE_SHOW_GROUPED_MINIONS,

    /**
     * Разрешение создавать группу миньонов
     */
    ROLE_CREATE_MINIONS_GROUP,

    /**
     * Разрешение просматривать детальную информацию по миньону
     */
     ROLE_SHOW_MINION_DETAILS,

    /**
     * Разрешение редактировать название группы миньона
     */
     ROLE_EDIT_MINIONS_GROUP,

    /**
     * Разрешение удалять группу миньона
     */
     ROLE_DELETE_MINIONS_GROUP,

    /**
     * Разрешение редактировать группы к которым принадлежит миньон
     */
     ROLE_EDIT_GROUPS_OF_MINION,

    /**
     * Разрешение выполнять скрипты на миньоне
     */
    ROLE_EXECUTE_SCRIPTS_ON_MINION,

    //endregion

     //region SCRIPTS PAGE PERMISSIONS

    /**
    * Разрешение просматривать страницу скриптов
    */
    ROLE_PAGE_SCRIPTS,

    /**
     * Разрешение просматривать сгрупированные скрипты по группам на странице Скрипты
     */
     ROLE_SHOW_GROUPED_SCRIPTS,

    /**
     * Разрешение выполнять скрипт на миньонах
     */
     ROLE_EXECUTE_SCRIPT_ON_MINIONS,

    /**
     * Разрешение создавать скрипт и его группу
     */
    ROLE_CREATE_SCRIPT_AND_GROUP,

    /**
     * Разрешение просматривать детальную информацию по скрипту
     */
    ROLE_SHOW_SCRIPT_DETAILS,

    /**
     * Разрешение редактировать скрипт
     */
    ROLE_EDIT_SCRIPT,

    /**
     * Разрешает удалять скрипт
     */
    ROLE_DELETE_SCRIPT,

    /**
     * Разрешение редактировать название группы скриптов
     */
    ROLE_EDIT_SCRIPTS_GROUP,

    /**
     * Разрешение удалять название группы скриптов
     */
     ROLE_DELETE_SCRIPTS_GROUP,

    //endregion

    //region JOB RESULTS PAGE PERMISSIONS

      /**
      * Разрешение просматривать страницу работ
      */
      ROLE_PAGE_JOB_RESULTS,

    /**
     * Разрешение фильтровать результаты выполнения скриптов
     */
     ROLE_FILTER_JOB_RESULTS,

    /**
     * Разрешение просматривать результаты выполнения работы
     * с количеством результатов по статусам
     */
     ROLE_SHOW_JOB_RESULTS_COUNTERS,

    /**
     * Разрешение просматривать детальный список результатов работы
     */
     ROLE_SHOW_RESULTS_BY_JOB,

    /**
     * Разрешение просматривать детали конкретного результата работы
     */
    ROLE_SHOW_RESULT_DETAILS,

    /**
     * Разрешение перезапускать скрипты на миньоне
     */
    ROLE_RE_EXECUTE_SCRIPTS_ON_MINIONS

    //endregion

    /**
     * @return Список разрешений для пользователя, которому разрешено только просматривать данные
     */
    static List<Permission> reviever() {
        return [
                ROLE_PAGE_MAIN,
                ROLE_SHOW_MINIONS_COUNTS_STATUS,
                ROLE_SHOW_MINIONS_COUNTS_GROUP,
                ROLE_SHOW_ACCEPTED_MINIONS,
                ROLE_SHOW_DENIED_MINIONS,
                ROLE_SHOW_REJECTED_MINIONS,
                ROLE_SHOW_UNACCEPTED_MINIONS,
                ROLE_PAGE_GROUPS_AND_MINIONS,
                ROLE_SHOW_GROUPED_MINIONS,
                ROLE_SHOW_MINION_DETAILS,
                ROLE_PAGE_SCRIPTS,
                ROLE_SHOW_GROUPED_SCRIPTS,
                ROLE_SHOW_SCRIPT_DETAILS,
                ROLE_PAGE_JOB_RESULTS,
                ROLE_FILTER_JOB_RESULTS,
                ROLE_SHOW_JOB_RESULTS_COUNTERS,
                ROLE_SHOW_RESULTS_BY_JOB,
                ROLE_SHOW_RESULT_DETAILS
        ]
    }

    /**
     * @return Список разрешений для пользователя, который может управлять скриптами
     */
    static List<Permission> scriptMaster() {
        return [
                ROLE_PAGE_SCRIPTS,
                ROLE_SHOW_GROUPED_SCRIPTS,
                ROLE_CREATE_SCRIPT_AND_GROUP,
                ROLE_SHOW_SCRIPT_DETAILS,
                ROLE_EDIT_SCRIPT,
                ROLE_DELETE_SCRIPT,
                ROLE_EDIT_SCRIPTS_GROUP,
                ROLE_DELETE_SCRIPTS_GROUP
        ]
    }

    /**
     * @return Список разрешений для пользователя, которому разрешено управлять миньонами
     */
    static List<Permission> minionMaster() {
        return [
                ROLE_PAGE_MAIN,
                ROLE_SHOW_MINIONS_COUNTS_STATUS,
                ROLE_SHOW_MINIONS_COUNTS_GROUP,
                ROLE_SHOW_ACCEPTED_MINIONS,
                ROLE_SHOW_DENIED_MINIONS,
                ROLE_SHOW_REJECTED_MINIONS,
                ROLE_SHOW_UNACCEPTED_MINIONS,
                ROLE_ACCEPT_MINION,
                ROLE_DELETE_MINION,
                ROLE_REJECT_MINION,
                ROLE_PAGE_GROUPS_AND_MINIONS,
                ROLE_SHOW_GROUPED_MINIONS,
                ROLE_CREATE_MINIONS_GROUP,
                ROLE_SHOW_MINION_DETAILS,
                ROLE_EDIT_MINIONS_GROUP,
                ROLE_DELETE_MINIONS_GROUP,
                ROLE_EDIT_GROUPS_OF_MINION
        ]
    }

    /**
     * @return Список разрешений для пользователя, которому разрешено выполнять скрипты на миньонах
     */
    static List<Permission> executor() {
        return [
                ROLE_PAGE_GROUPS_AND_MINIONS,
                ROLE_SHOW_GROUPED_MINIONS,
                ROLE_SHOW_MINION_DETAILS,
                ROLE_EXECUTE_SCRIPTS_ON_MINION,
                ROLE_PAGE_SCRIPTS,
                ROLE_SHOW_GROUPED_SCRIPTS,
                ROLE_SHOW_SCRIPT_DETAILS,
                ROLE_EXECUTE_SCRIPT_ON_MINIONS
        ]
    }
}