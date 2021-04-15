import { FileService } from 'src/_services/file.service';
import { Injectable } from '@angular/core';

// TODO: ¡Los archivos a subir deben estar contenidos en un array!

@Injectable()
export class FileHelper {
    /**
     * Contiene el archivo a subir
     */
    private _file: File;

    /** 
     * Solamente utilizado para el recibido de un prestamo (tremendo machetazo jajaja)
    */
    private _file2: File;

    constructor(private fileService: FileService) { this._file = null; this._file2 = null; }

    get file() { return this._file; }

    get file2() { return this._file2; }

    /**
     * Invocada al seleccionar un archivo.
     * @param element Contiene el archivo
     */
    public fileChange(element: any) {
        this._file = element.target.files[0];
    }

    public file2Change(element: any) {
        this._file2 = element.target.files[0];
    }

    /**
     * Sube un archivo
     * @param model Modelo al que pertenece el archivo
     * @param id Identificador del registro
     */
    public async upload(model: number, id: string) {
        let formData = new FormData();
        formData.append("uploads[]", this._file, this._file.name);
        let res = await this.fileService.upload(formData, model, id).toPromise();
    }

    // Este es el más machetazo de todo el código. Sorry muchachos :c
    public async upload2(model: number, id: string) {
        let formData = new FormData();
        formData.append("uploads[]", this._file2, this._file2.name);
        let res = await this.fileService.upload(formData, model, id).toPromise();
    }
}