const [tasks, setTasks] = useState([]);
  const [newTasks, setNewTasks] = useState({ description: "tarea", listo: false });

  useEffect(() => {


    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const tareas = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("tareas", tareas);
      setTasks(tareas);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  const guardarTarea = async (e) => {
    e.preventDefault();
    console.log("guardando tarea", newTasks);
    await addDoc(collection(db, "tasks"), newTasks);
    fetchTasks();
  };

  const eliminarTarea = async (id) => {
    console.log("eliminar tarea", id);
    const docRef = doc(db, "tasks", id);
    await deleteDoc(docRef);
    fetchTasks();
  }

  const editarTarea = async (id, listo) => {
    console.log("editar tarea", id);
    const docRef = doc(db, "tasks", id);
    await updateDoc(docRef, { listo: !listo });
    fetchTasks();
  }