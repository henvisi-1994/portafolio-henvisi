<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Qualification;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class QualificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showEducation()
    {
        $educations = Qualification::where('type',['Education'])->orderBy('id')->get();
        return view('admin.qualification.edu',compact('educations'));
    }

    public function showExperience()
    {
        $experiences = Qualification::where('type',['Work'])->orderBy('id')->get();
        return view('admin.qualification.exp', compact('experiences'));
    }

    public function index()
{
    $result  = Qualification::all();
        return  compact('result');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        return view('admin.qualification.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     *
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
        $validated = $request->validate([
            'title' => 'required|min:3',
            'association' => 'required|min:3',
            'description' => 'required|min:3',
            'type'=> 'required',
            'from'=> 'required|min:4',
            'to'=> 'required|min:4'
        ]);
        $qualification =Qualification::create($validated);
        $modelo = $qualification;
            $mensaje = 'Guardado exitosamente';
            DB::commit();
            return response()->json(compact('mensaje', 'modelo'));
        } catch (Exception $e) {
            DB::rollBack();
            throw ValidationException::withMessages([
                'Error al insertar' => [$e->getMessage()],
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Qualification $qualification)
    {
        return view('admin.qualification.edit', compact('qualification'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Qualification $qualification)
    {
        try {
            DB::beginTransaction();
        $validated = $request->validate([
            'title' => 'required|min:3',
            'association' => 'required|min:3',
            'description' => 'required|min:3',
            'type'=> 'required',
            'from'=> 'required|min:4',
            'to'=> 'required|min:4'
        ]);
                // dd($validated);

        $qualification->update($validated);
        if($request['type']== 'Education'){
            $mensaje = 'Education Updated';
        }else{
            $mensaje = 'Experience Updated';
        }
        $modelo = $qualification;
        DB::commit();
        return response()->json(compact('mensaje', 'modelo'));
    } catch (Exception $e) {
        DB::rollBack();
        throw ValidationException::withMessages([
            'Error al insertar' => [$e->getMessage()],
        ]);
    }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Qualification $qualification)
    {
        $qualification -> delete();
        $mensaje = 'Qualification Deleted';
        return response()->json(compact('mensaje'));
    }
}
