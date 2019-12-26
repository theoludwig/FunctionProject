<!-- Config -->
<?php include("../../php/config.php");?>

<!-- Header -->
<?php include("../../incl/header.php");?>

<div class="container">
    <div class="row">
        <div class="col-sm-12 col-md-10 mx-auto">
            <div class="header">
                <h1 class="text-center pt-3 toDoListTitle"><img style="height: 1.4em;" src="/img/function-image/toDoList.png" alt="ToDoList">Liste de choses à faire</h1>
                <div class="clear pt-3 pb-3 mx-auto">
                    <i class="fas fa-sync"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-md-10 mx-auto">
            <div class="content">
                <!-- Remplissage de la liste avec Javascript -->
                <ul id="list">

                </ul>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-md-10 mx-auto">
            <div class="add-to-do">
                <form action="" id="addTask">
                    <i id="btnAddTask" class="fa fa-plus-circle"></i>
                    <input type="text" name="taskToAdd" id="taskToAdd" placeholder="Ajouter">
                </form>
            </div>
        </div>
    </div>
</div>

<script defer src="/scripts/toDoList.js"></script>

<!-- Footer -->
<?php include("../../incl/footer.php");?>