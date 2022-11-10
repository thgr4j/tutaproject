# URL checker
*by thgr4j*

Entwicklungsaufgabe, die für eine Bewerbung als Webentwickler bei Tutanota gestellt wurde.  
Das Projekt beinhaltet eine einfache Webpage mit Styling. Die Hauptanwendung befindet sich in `src/index.ts` bzw in kompilierter Form in `dist/index.js`. Diese Dateien beinhalten folgende Funktionen:

> Du sollst eine einfache Browser-Anwendung in Javascript oder Typescript entwickeln, die dem Benutzer erlaubt zu prüfen, ob eine eingegebene URL existiert. Der Benutzer soll eine URL eingeben können und die URL soll dann auf ein gültiges Format geprüft werden. Wenn das Format korrekt ist soll die URL zu seinem Server gesendet werden, der die Info zurückgibt, ob die URL existiert und ob sie auf eine Datei oder einen Ordner zeigt. Du sollst nicht die Server-Seite implementieren, sondern den Server auf der Client-Seite mocken. Der Server-Aufruf soll asynchron sein.
Die Prüfung des Formats der URL und die Prüfung der Existenz soll getriggert werden während der Benutzer die URL eintippt, aber die Existenzprüfung soll gethrottled sein, um zu verhindern, dass zu viele Server-Anfragen gemacht werden. Diese Aufgabe sollte nicht mehr als zwei bis drei Stunden in Anspruch nehmen.