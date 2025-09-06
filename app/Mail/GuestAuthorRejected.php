<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\AuthorApplication;

class GuestAuthorRejected extends Mailable
{
    use Queueable, SerializesModels;

    public $application;

    // Ubah tipe parameter jadi AuthorApplication
    public function __construct(AuthorApplication $application)
    {
        $this->application = $application;
    }

    public function build()
    {
        return $this->from(config('mail.from.address'), config('mail.from.name'))
            ->subject('Pengajuan Author Ditolak')
            ->view('emails.guest_author_rejected')
            ->with([
                // Kirim data yang dibutuhkan ke view email
                'name' => $this->application->full_name,
                'email' => $this->application->email,
            ]);
    }
}
