<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BaseRequest extends FormRequest
{
    public function success($result, $message) {
        $response = [
            'success' => true,
            'data'    => $result,
            'message' => $message,
        ];
  
        return response()->json($response, 200);
    }

    public function error($error, $errorMessages = [], $code = 422) {
        $response = [
            'success' => false,
            'message' => $error,
        ];
  
        if(!empty($errorMessages)){
            $response['data'] = $errorMessages;
        }
  
        return response()->json($response, $code);
    }
}
