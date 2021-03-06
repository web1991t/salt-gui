package org.riversoft.salt.gui.model.view

import org.riversoft.salt.gui.domain.SaltScript
import org.riversoft.salt.gui.domain.SaltScriptGroup

class SaltScriptGroupViewModel {

    String id

    String group

    List<SaltScriptViewModel> scripts = []

    SaltScriptGroupViewModel(SaltScriptGroup saltScriptGroup) {

        this.id = saltScriptGroup.id
        this.group = saltScriptGroup.name

        for (SaltScript saltScript : saltScriptGroup.scriptList) {
            this.scripts.add(new SaltScriptViewModel(saltScript))
        }
    }
}
