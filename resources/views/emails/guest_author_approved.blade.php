<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Akun Author Disetujui</title>
</head>

<body style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
    <div style="max-width:600px; margin:0 auto; padding:20px; border:1px solid #ddd; border-radius:8px;">
        <h2 style="color:#4F46E5;">Halo {{ $user->name }},</h2>
        <p>Akun Author Anda telah disetujui!</p>
        <p>Berikut informasi login sementara Anda:</p>
        <ul>
            <li><strong>Email:</strong> {{ $user->email }}</li>
            <li><strong>Password sementara:</strong> {{ $password }}</li>
        </ul>
        <p>Silakan login dan segera ubah password Anda untuk keamanan akun.</p>

        <div style="margin: 20px 0;">
            <a href="{{ url('/login') }}"
                style="display:inline-block; padding:10px 20px; background:#4F46E5; color:#fff; text-decoration:none; border-radius:6px;">
                Login & Ganti Password
            </a>

        </div>

        <p style="font-size:12px; color:#888; margin-top:10px;">
            Jika Anda tidak mendaftar sebagai author, abaikan email ini.
        </p>
    </div>
</body>

</html>
