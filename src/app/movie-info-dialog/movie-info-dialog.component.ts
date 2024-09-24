import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-info-dialog',
  templateUrl: './movie-info-dialog.component.html',
  styleUrls: ['./movie-info-dialog.component.scss'],
})
export class MovieInfoDialogComponent implements OnInit {
  constructor(
    // Dependency injection to allow data passing to dialog
    @Inject(MAT_DIALOG_DATA)
    // Data passed to dialog when opened
    public data: {
      title: string;
      content: string;
    },
    // Allow control to close the dialog
    public dialogRef: MatDialogRef<MovieInfoDialogComponent>
  ) {}

  ngOnInit(): void {}

  closeMovieInfoDialog(): void {
    this.dialogRef.close();
  }
}
